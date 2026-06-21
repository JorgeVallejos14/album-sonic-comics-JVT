const statusStyles = {
	tengo: {
		backgroundColor: '#2e7d32',
		color: '#ffffff',
	},
	repetida: {
		backgroundColor: '#f9a825',
		color: '#1f1f1f',
	},
	falta: {
		backgroundColor: '#9e9e9e',
		color: '#ffffff',
	},
}

function StickerCard({ id, number, name, group, status, onStatusChange }) {
	const cardStyle = {
		...statusStyles[status],
		color: '#111827',
		padding: '1rem',
		borderRadius: '16px',
		boxShadow: '0 10px 24px rgba(0, 0, 0, 0.12)',
		border: '1px solid rgba(255, 255, 255, 0.18)',
		minWidth: '220px',
		cursor: 'pointer',
	}

	const labelStyle = {
		display: 'inline-block',
		marginBottom: '0.5rem',
		padding: '0.25rem 0.6rem',
		borderRadius: '999px',
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		color: '#111827',
		fontSize: '0.78rem',
		fontWeight: 700,
		textTransform: 'uppercase',
		letterSpacing: '0.06em',
	}

	return (
		<article style={cardStyle} onClick={() => onStatusChange(id)}>
			<span style={labelStyle}>{status}</span>
			<div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.35rem', fontWeight: 600 }}>Sticker #{number}</div>
			<h3 style={{ margin: '0 0 0.5rem', fontSize: '1.35rem', lineHeight: 1.1, fontWeight: 800 }}>{name}</h3>
			<p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>Grupo: {group}</p>
		</article>
	)
}

export default StickerCard
