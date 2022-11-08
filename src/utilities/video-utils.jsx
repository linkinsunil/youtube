const getFilteredVideos = (videos, category, searchKey) => {
  return videos.filter(video => {
    if (category === 'All') return videos;
    return video.category === category;
  });
  // .filter(
  //   video =>
  //     video.title.toLowerCase().includes(searchKey.toLowerCase()) ||
  //     video.category.toLowerCase().includes(searchKey.toLowerCase())
  // );
};

export { getFilteredVideos };
