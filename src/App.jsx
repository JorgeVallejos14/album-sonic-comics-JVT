import { stickers } from './data/stickers'
import StickerCard from './components/StickerCard'
import AlbumSummary from './components/AlbumSummary'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'album-sonic-collection'

function createInitialCollection() {
	const emptyCollection = stickers.reduce((accumulator, sticker) => {
		accumulator[sticker.id] = 'falta'
		return accumulator
	}, {})

	if (typeof window === 'undefined') {
		return emptyCollection
	}

	const storedCollection = window.localStorage.getItem(STORAGE_KEY)

	if (!storedCollection) {
		return emptyCollection
	}

	try {
		const parsedCollection = JSON.parse(storedCollection)

		return stickers.reduce((accumulator, sticker) => {
			accumulator[sticker.id] = parsedCollection?.[sticker.id] ?? 'falta'
			return accumulator
		}, {})
	} catch {
		return emptyCollection
	}
}

function App() {
	const [collection, setCollection] = useState(createInitialCollection)
	const [searchText, setSearchText] = useState('')
	const [selectedStatus, setSelectedStatus] = useState('Todas')

	useEffect(() => {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(collection))
	}, [collection])

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

	const visibleStickers = stickers.filter((sticker) => {
		const query = searchText.trim().toLowerCase()
		const matchesText =
			sticker.name.toLowerCase().includes(query) ||
			sticker.code.toLowerCase().includes(query)
		const matchesStatus =
			selectedStatus === 'Todas' || collection[sticker.id] === selectedStatus

		return matchesText && matchesStatus
	})

	return (
		<main style={{
			minHeight: '100vh',
			padding: '2rem',
			background: 'linear-gradient(180deg, #f4f7fb 0%, #e8edf5 100%)',
			fontFamily: 'system-ui, sans-serif',
		}}>
			<section style={{
				maxWidth: '1100px',
				margin: '0 auto 1.5rem',
				display: 'grid',
				gap: '0.75rem',
			}}>
				<div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
					<input
						type="text"
						value={searchText}
						onChange={(event) => setSearchText(event.target.value)}
						placeholder="Buscar por nombre o código"
						style={{
							padding: '0.9rem 1rem',
							borderRadius: '12px',
							border: '1px solid #c7d2e2',
							fontSize: '1rem',
							outline: 'none',
						}}
					/>
					<select
						value={selectedStatus}
						onChange={(event) => setSelectedStatus(event.target.value)}
						style={{
							padding: '0.9rem 1rem',
							borderRadius: '12px',
							border: '1px solid #c7d2e2',
							fontSize: '1rem',
							backgroundColor: '#ffffff',
							color: '#111827',
							fontWeight: 600,
							boxShadow: '0 4px 12px rgba(15, 23, 42, 0.06)',
						}}
					>
						<option value="Todas">todas</option>
						<option value="tengo">tengo</option>
						<option value="repetida">repetidas</option>
						<option value="falta">faltan</option>
					</select>
				</div>
				<p style={{ margin: 0, fontWeight: 700, color: '#374151' }}>
					Láminas visibles: {visibleStickers.length}
				</p>
				<AlbumSummary collection={collection} />
			</section>

			<section style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
				gap: '1rem',
				maxWidth: '1100px',
				margin: '0 auto',
			}}>
				{visibleStickers.map((sticker) => (
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
