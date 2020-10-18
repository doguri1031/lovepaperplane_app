import ImageResizer from 'react-native-image-resizer';
export const dateTransformer = (dateString) => {
  let postDate = new Date(dateString);
  let year = postDate.getFullYear();
  let month = postDate.getMonth() + 1;
  let date = postDate.getDate();
  let hours = postDate.getHours();
  let minutes = postDate.getMinutes();
  let seconds = postDate.getSeconds();

  let today = new Date();
  let currentYear = today.getFullYear(); // 년도
  let currentMonth = today.getMonth() + 1; // 월
  let currentDate = today.getDate();
  let currentHours = today.getHours(); // 시
  let currentMinutes = today.getMinutes(); // 분
  let currentSeconds = today.getSeconds();

  if (year !== currentYear) {
    return `${year}년 ${month}월 ${date}일`;
  } else if (month !== currentMonth) {
    return ` ${month}월 ${date}일`;
  } else if (date === currentDate - 1) {
    if (hours - currentHours > 0) {
      return `${24 - (hours - currentHours)}시간 전`;
    }
    return ` ${month}월 ${date}일`;
  } else if (date === currentDate) {
    if (currentHours === hours) {
      return `${currentMinutes - minutes}분 전`;
    }
    return `${currentHours - hours}시간 전`;
  } else {
    return ` ${month}월 ${date}일`;
  }
};


const imageMaxWidth = 300;
const imageMaxHeight = 300;

export const imageResizer = async (image) => {
  
  let imageHeight=image.width;
  let imageWidth=image.height;
  console.log(image);
  if(image.height>image.width&&image.height >imageMaxHeight){
      imageHeight = 300;
      imageWidth = 300* image.width / image.height;
  }else if(image.width>image.height&&image.width >imageMaxWidth){
      imageWidth = 300;
      imageHeight = 300 * image.height / image.width;
  }
  console.log('before');
  let resizedImage;
  await ImageResizer.createResizedImage(image.path, imageWidth, imageHeight, 'JPEG', 60, )
  .then(response => {
    // response.uri is the URI of the new image that can now be displayed, uploaded...
    // response.path is the path of the new image
    // response.name is the name of the new image with the extension
    // response.size is the size of the new image
    console.log('success');
    resizedImage= response;
  })
  .catch(err => {
    console.log('failure');
    // Oops, something went wrong. Check that the filename is correct and
    // inspect err to get more details.
  });
  console.log('inUtil');
  return resizedImage;
}