import { instance } from '@/shared/api'
import { createField } from '@/shared/utils'
import { invoke } from '@withease/factories'
import { attach, createEffect, createEvent, createStore, sample } from 'effector'

// import { persist } from 'effector-storage/session'

export enum ListeningStatus {
	Play,
	Stop,
}

// const HISTORY_KEY = 'prompts_history'

export const pageStartEv = createEvent<void>()
export const promptSubmitEv = createEvent<void>()
export const speakingApiChangeEv = createEvent<{
	speak?: () => void
	speaking?: boolean
	cancel?: () => void
	voices?: any
}>()
export const cancelSpeakEv = createEvent<void>()

export const listeningStatusChangeEv = createEvent<void>()

export const prompt = invoke(() =>
	createField({
		initial: '',
		rules: [{ validate: (value) => value !== '', message: 'Поле обьязательное' }],
	}),
)
export const getPromptAnswerFx = attach({
	source: prompt.$value,
	effect: (prompt) => instance.post('/send_message', { cookie: '', message: prompt }),
})

const $recoginition = createStore<SpeechRecognition | null>(null)
export const $speakApi = createStore<{
	speak?: () => void
	speaking?: boolean
	cancel?: () => void
	voices?: any
} | null>(null)
export const $speaking = $speakApi.map((api) => api?.speaking || null)
export const $promptsHistory = createStore<{ prompt: string; answer: string }[]>([])

export const $listeningStatus = createStore<ListeningStatus>(ListeningStatus.Stop)

export const $pending = getPromptAnswerFx.pending

export const listeningStartFx = createEffect<void, SpeechRecognition>(() => {
	const recoginition = new (window.SpeechRecognition ||
		window.webkitSpeechRecognition ||
		(window as any).mozSpeechRecognition ||
		(window as any).msSpeechRecognition)()

	recoginition.continuous = true
	recoginition.interimResults = false
	recoginition.lang = 'ru-RU'
	recoginition.onnomatch = (arg) => {
		console.log(arg, 'audio')
	}
	recoginition.onresult = (e) => {
		const { results } = e
		const prompts = Array.from(results)
		const promptText = prompts.map((result: any) => result[0].transcript).join('. ')
		prompt.valueChangeEv(promptText)
	}
	recoginition.onend = () => listeningStopFx()
	recoginition.onerror = (e) => {
		console.error(e)
	}
	// recoginition.onstart = () => listeningStartFx()
	// recoginition.onend = () => listeningStopFx()
	recoginition.start()
	return recoginition
})
export const listeningStopFx = attach({
	source: $recoginition,
	effect: (recoginition) => {
		if (!recoginition) throw new Error('recoginition is null')
		recoginition.stop()
	},
})
const cancelSpeakFx = attach({
	source: $speakApi,
	effect: (api) => {
		if (!api || !api.cancel) throw new Error('api or cancel is null')
		api.cancel()
	},
})

// persist({ source: $promptsHistory, key: 'fewf' })

$speakApi.on(speakingApiChangeEv, (speakApi, newProps) => {
	if (speakApi) {
		return { ...speakApi, ...newProps }
	}
	return { ...newProps }
})

sample({
	clock: listeningStatusChangeEv,
	filter: $listeningStatus.map((status) => status === ListeningStatus.Stop),
	target: listeningStartFx,
})

$recoginition.on(listeningStartFx.doneData, (_, newRecoginition) => newRecoginition)
$listeningStatus.on(listeningStartFx.done, () => ListeningStatus.Play)

sample({
	clock: listeningStatusChangeEv,
	filter: $listeningStatus.map((status) => status === ListeningStatus.Play),
	target: listeningStopFx,
})

$listeningStatus.on(listeningStopFx.done, () => ListeningStatus.Stop)

sample({
	clock: promptSubmitEv,
	target: getPromptAnswerFx,
})

const promptWillUpdate = sample({
	clock: getPromptAnswerFx.doneData,
	source: prompt.$value,
	fn: (prompt, { data }) => ({ prompt, answer: data.response }),
})

$promptsHistory.on(promptWillUpdate, (prompts, newPrompt) => [...prompts, newPrompt])
prompt.$value.on(promptWillUpdate, () => '')

// $promptAnswer.on(getPromptAnswerFx.done, (_, { result }) => result.data.response)

sample({
	clock: getPromptAnswerFx.done,
	source: $speakApi,
	filter: (speakApi: any | null): speakApi is any => !!speakApi,
	fn: ({ speak, voices }, { result }) => {
		speak({ text: result.data.response, voice: voices.find((voice: any) => voice.lang.includes('ru-RU')) })
	},
})

sample({
	clock: cancelSpeakEv,
	target: cancelSpeakFx,
})

sample({
	clock: pageStartEv,
	target: [prompt.$value.reinit, prompt.$error.reinit, $listeningStatus.reinit],
})
