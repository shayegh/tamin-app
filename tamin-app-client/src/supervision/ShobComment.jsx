import React, {useState} from 'react';
import {addShobComment} from "../util/api";
import {toast} from "react-toastify";
import {showError} from "../util/Helpers";
import {Input, Modal} from "antd";

const {TextArea} = Input;

const ShobComment = (props) => {
    console.log('ShobComment props: ',props);
    const {headerId, detailId, shobComment, showModal} = props;
    const [visible, setVisible] = useState(showModal);
    const [comment, setComment] = useState(shobComment);

    const onChange = ({target: {value}}) => {
        setComment(value);
    };

    const handleOk = e => {
        console.log('Shob Comment:', comment);
        addShobComment(headerId, detailId, comment)
            .then(response => {
                    console.log('ShobCommentDetail Response :', response);
                    toast.success('توضیحات با موفقیت ثبت شد');
                }
            ).catch(error => showError(error));
        setVisible(false);
    };

    const handleCancel = e => {
        console.log(e);
        setVisible(false);
    };

    return (
        <Modal
            title="جزئیات"
            style={{direction: 'ltr'}}
            bodyStyle={{direction: 'rtl'}}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <TextArea
                value={comment}
                placeholder="توضیحات واحد"
                onChange={onChange}
                autoSize={{minRows: 2, maxRows: 6}}
            />
        </Modal>
    );
};

export default ShobComment;
