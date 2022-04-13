function useDate(option, locales = 'en-US') {
	return (milliseconds) =>
		new Date(parseInt(milliseconds))?.toLocaleString(locales, option) || '';
}

export default useDate;
