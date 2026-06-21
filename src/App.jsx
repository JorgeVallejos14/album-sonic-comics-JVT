import { stickers } from './data/stickers'
import StickerCard from './components/StickerCard'

function App() {
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
				<StickerCard number={stickers[0].code} name={stickers[0].name} group={stickers[0].group} status="tengo" />
				<StickerCard number={stickers[1].code} name={stickers[1].name} group={stickers[1].group} status="falta" />
				<StickerCard number={stickers[2].code} name={stickers[2].name} group={stickers[2].group} status="repetida" />
				<StickerCard number={stickers[3].code} name={stickers[3].name} group={stickers[3].group} status="tengo" />
				<StickerCard number={stickers[4].code} name={stickers[4].name} group={stickers[4].group} status="falta" />
			</section>
		</main>
	)
}

export default App
