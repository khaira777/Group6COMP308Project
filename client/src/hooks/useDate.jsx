function useDate(dateOnly = false) {
	const getDateStringFromMilliseconds = (milliseconds) => {
		const date = new Date(parseInt(milliseconds));

		const dateString = date.toLocaleDateString(undefined, {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		});

		const timeString = date.toLocaleTimeString(undefined, {
			hour: 'numeric',
			minute: 'numeric',
		});

		return dateOnly ? dateString : `${dateString}, ${timeString}`;
	};

	return { getDateStringFromMilliseconds };
}

export default useDate;
