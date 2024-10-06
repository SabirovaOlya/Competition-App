import { useState, useRef, useCallback, memo } from 'react'
import { MdPhotoSizeSelectLarge } from "react-icons/md";
import { AiFillCloseSquare } from 'react-icons/ai';
import { alert } from "../../components/alert/alert"
import './style.scss'


function ImageContainer({ sourceImages, setSourceImages, limit, path, setPath }) {
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

    function imageDelete(id, is_path) {
        if(is_path){
            setPath('')
        }else{
            const newSelectedImages = selectedImages.filter((_, i) => i !== id);
            const newSourceImages = sourceImages.filter((_, i) => i !== id);
            setSelectedImages([...newSelectedImages])
            setSourceImages([...newSourceImages])
        }
    }

    return (
        <div>
            <p className='photo_text'>{'Image'}</p>
            <div className='wrapper_photo_add'>
                <div className='photo_add_buttons'>
                    { 
                        (limit && selectedImages?.length === 1) || path ?
                        <></> :
                        <button type='button' onClick={photoOpen}>
                            Choose an image <MdPhotoSizeSelectLarge className='icon_load' />
                        </button>   
                    }
                </div>
                <input ref={imageInput} type="file" accept="image/*" onChange={handleImageChange} />
                <div className='photo_images'>
                    {
                        path && (<div className='image_container' key={'path'}>
                            <img
                                width="200"
                                src={path}
                                alt='image is not uploaded'
                                className='photo_show'
                                style={{ objectFit: 'contain' }}
                            />
                            <button type='button' onClick={() => { imageDelete(1, true) }}><AiFillCloseSquare className='icon_no' /></button>
                        </div>)
                    }
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
                                    <button type='button' onClick={() => { imageDelete(index, false) }}><AiFillCloseSquare className='icon_no' /></button>
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