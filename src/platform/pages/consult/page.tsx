/* eslint-disable jsx-a11y/media-has-caption */
import { Button, Container, Field, TextArea } from '@/shared/ui'
import {
	ArrowLeftIcon,
	PaperAirplaneIcon,
	PlayCircleIcon,
	StopCircleIcon,
	XCircleIcon,
} from '@heroicons/react/20/solid'
import { useUnit } from 'effector-react'
import { type PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSpeechSynthesis } from 'react-speech-kit'

import * as model from './model'

export function ConsultPage() {
	const startPage = useUnit(model.pageStartEv)
	const histories = useUnit(model.$promptsHistory)
	const speaking = useUnit(model.$speaking)
	const navigate = useNavigate()

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => startPage(), [])

	return (
		<SpeakProvider>
			<Container
				className='flex flex-col min-h-screen pb-32 bg-zinc-800'
				containerClassname='flex-1 max-w-2xl sm:mt-3 sm:mb-10'
			>
				<Button shape='outlined' onClick={() => navigate(-1)}>
					<ArrowLeftIcon width={20} color='white' />
				</Button>
				<div className='h-full mt-10'>
					{histories.map((history, historyIdx, arr) => (
						<>
							<div key={historyIdx} className='flex flex-col gap-1'>
								<h2 className='text-xl text-white font-bold'>{history.prompt}</h2>
								<p className='text-sm text-gray-300 '>{history.answer}</p>
							</div>
							{historyIdx !== arr.length - 1 && <div className='w-full h-px my-5 bg-gray-500' />}
						</>
					))}
				</div>
				{speaking && <h2 className='text-sm text-white font-bold'>...Speaking</h2>}
			</Container>
			<BottomBar />
		</SpeakProvider>
	)
}

function BottomBar() {
	return (
		<aside className='max-w-2xl w-full fixed bottom-[20px] left-[50%] translate-x-[-50%] p-5 rounded-3xl'>
			<PromptContainer>
				<div className='flex justify-center items-center w-full relative'>
					<Prompt />
					<div className='flex flex-row items-center gap-1 absolute top-[50%] right-[10px] translate-y-[-50%]'>
						<Listening />
						<Submit />
					</div>
				</div>
			</PromptContainer>
		</aside>
	)
}

function PromptContainer({ children }: PropsWithChildren) {
	const { error } = useUnit({ error: model.prompt.$error })

	return <Field error={error}>{children}</Field>
}

function Prompt() {
	const { value, change, error, pending, speaking } = useUnit({
		value: model.prompt.$value,
		change: model.prompt.valueChangeEv,
		error: model.prompt.$error,
		pending: model.$pending,
		speaking: model.$speaking,
	})

	return (
		<TextArea
			className='max-h-40 h-14 px-1 pr-24 overflow-x-hidden resize-none rounded-xl shadow-xl'
			error={error}
			disabled={pending || !!speaking}
			value={value}
			onChange={(e) => change(e.target.value)}
		/>
	)
}

function Listening() {
	const { status, changeStatus, pending, speaking } = useUnit({
		status: model.$listeningStatus,
		changeStatus: model.listeningStatusChangeEv,
		changePrompt: model.prompt.valueChangeEv,
		pending: model.$pending,
		speaking: model.$speaking,
	})

	return {
		[model.ListeningStatus.Stop]: (
			<Button variant='secondary' size='icon' disabled={pending || !!speaking} onClick={changeStatus}>
				<PlayCircleIcon width={24} color='white' />
			</Button>
		),
		[model.ListeningStatus.Play]: (
			<Button variant='danger' size='icon' disabled={pending || !!speaking} onClick={changeStatus}>
				<StopCircleIcon width={24} color='white' />
			</Button>
		),
	}[status]
}

function Submit() {
	const { submit, pending, speaking, cancel } = useUnit({
		submit: model.promptSubmitEv,
		pending: model.$pending,
		speaking: model.$speaking,
		cancel: model.cancelSpeakEv,
	})

	return {
		false: (
			<Button size='icon' disabled={pending} onClick={submit}>
				<PaperAirplaneIcon width={18} color='white' />
			</Button>
		),
		true: (
			<Button size='icon' variant='danger' disabled={pending} onClick={cancel}>
				<XCircleIcon width={18} color='white' />
			</Button>
		),
	}[String(!!speaking)]
}

function SpeakProvider({ children }: PropsWithChildren) {
	const changeSpeakApi = useUnit(model.speakingApiChangeEv)
	const { speak, speaking, cancel, voices } = useSpeechSynthesis()

	useEffect(() => {
		changeSpeakApi({ speak })
	}, [speak])

	useEffect(() => {
		changeSpeakApi({ cancel })
	}, [cancel])

	useEffect(() => {
		changeSpeakApi({ speaking })
	}, [speaking])

	useEffect(() => {
		changeSpeakApi({ voices })
	}, [voices])

	return <>{children}</>
}
