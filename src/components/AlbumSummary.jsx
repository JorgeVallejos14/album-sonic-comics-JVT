import { stickers } from '../data/stickers'

function AlbumSummary({ collection }) {
	const totalStickers = stickers.length
	const haveCount = Object.values(collection).filter((status) => status === 'tengo').length
	const repeatedCount = Object.values(collection).filter((status) => status === 'repetida').length
	const missingCount = Object.values(collection).filter((status) => status === 'falta').length
	const completionPercentage = totalStickers === 0 ? 0 : ((haveCount / totalStickers) * 100).toFixed(2)

	return (
		<div style={{
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
			gap: '0.75rem',
			marginTop: '0.5rem',
		}}>
			<div style={summaryCardStyle}>
				<span style={summaryLabelStyle}>Total cromos</span>
				<strong style={summaryValueStyle}>{totalStickers}</strong>
			</div>
			<div style={summaryCardStyle}>
				<span style={summaryLabelStyle}>Tengo</span>
				<strong style={summaryValueStyle}>{haveCount}</strong>
			</div>
			<div style={summaryCardStyle}>
				<span style={summaryLabelStyle}>Repetidas</span>
				<strong style={summaryValueStyle}>{repeatedCount}</strong>
			</div>
			<div style={summaryCardStyle}>
				<span style={summaryLabelStyle}>Faltan</span>
				<strong style={summaryValueStyle}>{missingCount}</strong>
			</div>
			<div style={summaryCardStyle}>
				<span style={summaryLabelStyle}>Completitud</span>
				<strong style={summaryValueStyle}>{completionPercentage}%</strong>
			</div>
		</div>
	)
}

const summaryCardStyle = {
	backgroundColor: '#ffffff',
	border: '1px solid #dbe4f0',
	borderRadius: '14px',
	padding: '1rem',
	boxShadow: '0 8px 18px rgba(15, 23, 42, 0.06)',
	display: 'grid',
	gap: '0.35rem',
}

const summaryLabelStyle = {
	fontSize: '0.82rem',
	fontWeight: 700,
	textTransform: 'uppercase',
	letterSpacing: '0.05em',
	color: '#6b7280',
}

const summaryValueStyle = {
	fontSize: '1.5rem',
	fontWeight: 800,
	color: '#111827',
}

export default AlbumSummary
