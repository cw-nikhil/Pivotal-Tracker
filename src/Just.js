import React, {memo, useState} from 'react'

function Just({e, remove, i}) {
    let [isVisible, setVisible] = useState(true);
    // console.log(e);
    return isVisible &&  (
        <div onClick = {() => setVisible(false)}>
            {`${e} is great`}
        </div>
    )
}

export default memo(Just);

