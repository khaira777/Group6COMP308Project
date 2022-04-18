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

		return dateOnly ? dateString : `${dateString} - ${timeString}`;
	};

	const getISODateStringFromMilliseconds = (milliseconds) => {
		const date = new Date(parseInt(milliseconds));
		const localOffset = date.getTimezoneOffset() * 60000;
		const convertedDate = new Date(date.getTime() - localOffset)
			.toISOString()
			.substring(0, 16);

		return convertedDate;
	};

	const checkIsDateAfterToday = (date) => {
		const today = new Date();
		const dateToCheck = new Date(date);

		return dateToCheck > today;
	};

	const getToday = () => {
		const date = new Date();
		const localOffset = date.getTimezoneOffset() * 60000;
		const today = new Date(date.getTime() - localOffset)
			.toISOString()
			.substring(0, 16);

		return today;
	};

	return {
		getDateStringFromMilliseconds,
		getISODateStringFromMilliseconds,
		getToday,
		checkIsDateAfterToday,
	};
}

export default useDate;
