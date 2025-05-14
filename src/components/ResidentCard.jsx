import { useEffect } from 'react';
import { useFetchApi } from '../hooks/useFetchApi';
import './ResidentCard.css';

function ResidentCard({ url }) {
	const { fetchingData, data: resident, loading } = useFetchApi();

	useEffect(() => {
		fetchingData(url);
	}, [url]);

	if (loading) return <p>Loading...</p>;

	const totalEpisodes = resident?.episode.length;
	const totalEpisodesText = totalEpisodes === 1 ? 'eppisode' : 'eppisodes';

	const statusClass =
		resident?.status === 'Alive'
			? 'alive'
			: resident?.status === 'Dead'
			? 'dead'
			: 'unknow';

	return (
		<div className="residents">
			<div className="residents__image">
				<img
					className="residents__img"
					src={resident?.image}
					alt={resident?.name}
				/>
				<span className="residents__status">
					<span className={`residents--${statusClass}`} />
					{resident?.status}
				</span>
			</div>
			<div className="residents__body">
				<h2 className="residents__name">{resident?.name}</h2>
				<div className="residents__content"></div>
				<p className="residents__item">
					<b>Specie: </b> {resident?.species}
				</p>
				<p className="residents__item">
					<b>origin: </b> {resident?.origin?.name}
				</p>
				<p className="residents__item">
					<b>Eppisodes where appear: </b> {totalEpisodes} {totalEpisodesText}
				</p>
			</div>
		</div>
	);
}

export default ResidentCard;
