import moment from "moment";

const   fileFormat = (url = '') =>{
        const fileExt  = url.split('.').pop();

        if(fileExt === 'mp4' || fileExt === 'webm' || fileExt === 'ogg') return 'video' 
        if(fileExt === 'mp3' || fileExt === 'wav') return 'audio' 
        if(fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'gif') return 'image'
        
        return 'file'
    }

const transforImage =  (url = "", width = 100) => {
  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);

  return newUrl;
};

const getLast7Days = () => {
    const currentDate = moment();
    const last7Days = [];

    for(let i = 0; i < 7; i++){
        const dayDate = currentDate.clone().subtract(i,'days');
        const dayName = dayDate.format('dddd')
        last7Days.unshift(dayName)
    }
    // last7Days.unshift(currentDate.format('MM D'));
    //     currentDate.subtract(1,'days');
    return last7Days;

}

const getOrSaveFromStorage = ({ key, value, get }) => {
  if (get)
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  else localStorage.setItem(key, JSON.stringify(value));
};

export {fileFormat , transforImage, getLast7Days, getOrSaveFromStorage}