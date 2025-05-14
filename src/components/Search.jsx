import { useRef, useState, useEffect } from 'react';
import './Search.css';

function Search({ onSearch }) {
	const inputRef = useRef(null);
	const [error, setError] = useState('');
	const [suggestions, setSuggestions] = useState([]);

	const updateSuggestions = (value) => {
		if (!value) {
			setSuggestions([]);
			return;
		}
		const matchedNumbers = Array.from({ length: 128 }, (_, i) => i + 1).filter(
			(num) => num.toString().includes(value),
		);
		setSuggestions(matchedNumbers.slice(0, 5));
	};

	const handleSubmit = () => {
		const value = inputRef.current.value.trim();
		setError('');

		if (!value) {
			setError('Please enter a location id');
			return;
		}

		if (value < 1 || value > 128) {
			setError('Please enter a valid location id (1-128)');
			return;
		}

		onSearch(value);
		inputRef.current.value = '';
		setSuggestions([]);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') handleSubmit();
	};

	return (
		<div className="search-container">
			<div className="form__container">
				<input
					className="form__input"
					type="text"
					placeholder="Type a location id (1-128)"
					ref={inputRef}
					onChange={(e) => updateSuggestions(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<button onClick={handleSubmit} className="form__button">
					Search
				</button>

				{suggestions.length > 0 && (
					<ul className="suggestions-list">
						{suggestions.map((num) => (
							<li
								key={num}
								onClick={() => {
									inputRef.current.value = num;
									setSuggestions([]);
								}}
								className="suggestion-item"
							>
								{num}
							</li>
						))}
					</ul>
				)}
			</div>
			{error && <p className="error">{error}</p>}
		</div>
	);
}

export default Search;
