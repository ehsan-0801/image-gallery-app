import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import "./Gallery.css";
const Header = () => {
    return (
        <div className='text-center my-10'>
            <TypeAnimation
                sequence={ [
                    'This is image gallery',
                    500,
                    'Upload the images', //  Continuing previous Text
                    500,
                    'Drag and Drop to Sort',
                    500,
                    'Select the Checkbox to delete',
                    500,
                    'First One will be the featured image',
                    500,
                    'This is totally responsive',
                    500,
                ] }
                style={ { fontSize: '20px' } }
                repeat={ Infinity }
            />
        </div>
    );
};

export default Header;