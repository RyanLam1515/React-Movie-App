const useGenres = (selectedGenres) => {
    if(selectedGenres.length === 0) {
        return "";
    } 
    const GenreIds = selectedGenres.map((genre) => genre.id);
    return GenreIds.reduce((acc, curr) => acc + ',' + curr);
};

export default useGenres;