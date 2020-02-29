import React from 'react';
import ReactExport from 'react-export-excel';
import {FileExcelTwoTone} from '@ant-design/icons';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportExcel = ({data, cols, fileName, style}) => {
    return (
        <ExcelFile element={<FileExcelTwoTone  twoToneColor='#52c41a'
                                  style={style}/>}
                   filename={fileName}>
            <ExcelSheet data={data} name="Sheet1">
                {
                    cols
                        .filter(col => col.key !== 'id' && col.key !== 'index')
                        .map(({title, key}) => <ExcelColumn key={title} label={title} value={key}/>)
                }
            </ExcelSheet>
        </ExcelFile>
    );
};

export default ExportExcel;

