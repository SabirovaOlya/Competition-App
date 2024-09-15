import { useState, useRef, useCallback, memo } from 'react'
import { MdPhotoSizeSelectLarge } from "react-icons/md";
import { AiFillCloseSquare } from 'react-icons/ai';
import { alert } from "../../components/alert/alert"
import './style.scss'


function ImageContainer({ sourceImages, setSourceImages, limit }) {
    const imageInput = useRef(null)
    const [selectedImages, setSelectedImages] = useState([]);

    function photoOpen() {
        imageInput.current.click()
    }

    const handleImageChange = useCallback((event) => {
        const { files } = event.target;
        const allowedSize = 5 * 1024 * 1024;
        const images = [];
        const sourse = [];

        for (const file of files) {
            if (file.size <= allowedSize && /(png|jpe?g)$/.test(file.type)) {
                const image = {
                src: URL.createObjectURL(file)
                };
                images.push(image);
                sourse.push(file);
            } else {
                alert(`${file.name} the size is more then 5mb or image is not png, jpg, jpeg format`);
            }
        }
        setSelectedImages([...images, ...selectedImages]);
        setSourceImages([...sourse, ...sourceImages]);
    }, [selectedImages, sourceImages]);

    // const addImage = async () => {
    //     const images = new FormData()
    //     if (sourceImages.length > 0) {
    //         document.body.style.overflowY = 'hidden'
    //         sourceImages.forEach((image, i) => {
    //             images.append(`image[${i}]`, image);
    //         });
    //         await axios.post(`${process.env.REACT_APP_BASE_URL}/api/upload-photo`, images, {
    //             headers: {
    //             "Authorization": "Bearer " + window.localStorage.getItem('token'),
    //             "Content-Type": "multipart/form-data",
    //             }
    //         })
    //             .then(res => {
    //             setPath([...path, ...res?.data?.data])
    //             setSourceImages([])
    //             setSelectedImages([])
    //             alert("Rasmlar qo'shildi", 'success', 1500)
    //             setTimeout(() => {
    //                 document.body.style.overflowY = 'scroll'
    //             }, 1550);

    //             })
    //             .catch(err => {
    //             alert(err?.response?.data?.message, 'error', 1500)
    //             setTimeout(() => {
    //                 document.body.style.overflowY = 'scroll'
    //             }, 1550);
    //             })
    //     }else {
    //         alert('Rasm tanlang!', 'error')
    //     }
    // }

    function imageDelete(id) {
        const newSelectedImages = selectedImages.filter((_, i) => i !== id);
        const newSourceImages = sourceImages.filter((_, i) => i !== id);
        setSelectedImages([...newSelectedImages])
        setSourceImages([...newSourceImages])
    }

    return (
        <div>
            <p className='photo_text'>{'Image'}</p>
            <div className='wrapper_photo_add'>
                <div className='photo_add_buttons'>
                    { 
                        limit && selectedImages?.length === 1 ?
                        <></> :
                        <button type='button' onClick={photoOpen}>
                            Choose an image <MdPhotoSizeSelectLarge className='icon_load' />
                        </button>   
                    }
                </div>
                <input ref={imageInput} type="file" accept="image/*" onChange={handleImageChange} />
                <div className='photo_images'>
                    {
                        selectedImages?.map((image, index) => {
                            return (
                                <div className='image_container' key={index}>
                                <img
                                    width="200"
                                    src={image?.src}
                                    alt='image is not uploaded'
                                    className='photo_show'
                                    style={{ objectFit: 'contain' }}
                                />
                                <button type='button' onClick={() => { imageDelete(index) }}><AiFillCloseSquare className='icon_no' /></button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default memo(ImageContainer);