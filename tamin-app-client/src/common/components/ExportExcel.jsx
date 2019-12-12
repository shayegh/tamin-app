import React from 'react';
import ReactExport from "react-export-excel";
import {Icon} from "antd";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportExcel = ({data, cols}) => {
    return (
        <ExcelFile element={<Icon type="file-excel" theme="twoTone" twoToneColor='#52c41a' />}>
            <ExcelSheet data={data} name="Sheet1">
                {
                    cols.map(({title, key}) => (
                    <ExcelColumn label={title} value={key}/>
                ))
                }
            </ExcelSheet>
        </ExcelFile>
    );
};

export default ExportExcel;

