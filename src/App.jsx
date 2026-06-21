import { stickers } from './data/stickers'
import StickerCard from './components/StickerCard'
import { useState } from 'react'

function App() {
	const [collection, setCollection] = useState(() =>
		stickers.reduce((accumulator, sticker) => {
			accumulator[sticker.id] = 'falta'
			return accumulator
		}, {}),
	)

	const handleStatusChange = (id) => {
		setCollection((currentCollection) => {
			const currentStatus = currentCollection[id]
			const nextStatus = {
				falta: 'tengo',
				tengo: 'repetida',
				repetida: 'falta',
			}[currentStatus]

			return {
				...currentCollection,
				[id]: nextStatus,
			}
		})
	}

	return (
		<main style={{
			minHeight: '100vh',
			padding: '2rem',
			background: 'linear-gradient(180deg, #f4f7fb 0%, #e8edf5 100%)',
			fontFamily: 'system-ui, sans-serif',
		}}>
			<section style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
				gap: '1rem',
				maxWidth: '1100px',
				margin: '0 auto',
			}}>
				{stickers.map((sticker) => (
					<StickerCard
						key={sticker.id}
						id={sticker.id}
						number={sticker.code}
						name={sticker.name}
						group={sticker.group}
						status={collection[sticker.id]}
						onStatusChange={handleStatusChange}
					/>
				))}
			</section>
		</main>
	)
}

export default App
