 //테이블그리는 함수
 function drawTypeTable(){ //대가리

    let table = document.createElement('table');
    table.setAttribute(
        'style',
        'border-collapse:collapse;border-color:#333489;border-spacing:0;'
    );
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('saftyTables').appendChild(table);
    
    let row_2 = document.createElement('tr');
    row_2.setAttribute(
        'style',
        'background-color:#f0f0f0;border-color:black;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;'
    );
    let row_2_data_1 = document.createElement('th');
    
    row_2_data_1.setAttribute(
        'style',
        'border-color:inherit;text-align:center;vertical-align:top; width:7.5ch; font-size:20px;'
    );
    row_2.appendChild(row_2_data_1);

    let row_2_data_2 = document.createElement('th');
    row_2_data_2.innerHTML = "도로 점수";
    row_2_data_2.setAttribute(
        'style',
        'border-color:inherit;text-align:center;vertical-align:top; font-size:20px; width:8ch;'
    );
    let row_2_data_3 = document.createElement('th');
    row_2_data_3.innerHTML = "위험 점수";
    row_2_data_3.setAttribute(
        'style',
        'border-color:inherit;text-align:center;vertical-align:top; font-size:20px; width:8ch;'
    );
    let row_2_data_4 = document.createElement('th');
    row_2_data_4.innerHTML = "총 점수";
    row_2_data_4.setAttribute(
        'style',
        'border-color:inherit;text-align:center;vertical-align:top; font-size:20px; width:8ch;'
    );

    row_2.appendChild(row_2_data_2);
    row_2.appendChild(row_2_data_3);
    row_2.appendChild(row_2_data_4);

    thead.appendChild(row_2);
}

function drawDataTables(index,saftyparams){ //값 부분
    var saftyparamsArr = saftyparams.split(",");

    let table = document.createElement('table');
    table.setAttribute(
        'style',
        'border-collapse:collapse;border-color:#ccc;border-spacing:0;'
    );
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('saftyTables').appendChild(table);
    let row_1 = document.createElement('tr');
    row_1.setAttribute(
        'style',
        'background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
    );
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "경로"+(index+1);
    heading_1.rowSpan = 2;
    heading_1.style.backgroundColor = "#f9f9f9";
    heading_1.style.borderColor = "inherit";
    heading_1.style.textAlign = "center";
    heading_1.style.verticalAlign = "top";
    heading_1.style.width = "7ch;"
    // heading_1.setAttribute(
    //     'style',
    //     'background-color:#f9f9f9;border-color:inherit;text-align:center;vertical-align:top;'
    // );
    row_1.append(heading_1);


    for(var i = 0 ; i < 3 ; i++){
        let row_1_data =  document.createElement('th');
        row_1_data.setAttribute(
            'style',
            'background-color:#f9f9f9;border-color:inherit;text-align:center;color:#333;vertical-align:top;width:8ch;'
        );
        row_1_data.innerHTML = saftyparamsArr[i];
        row_1.appendChild(row_1_data);
    }
   


    let row_2 = document.createElement('tr');
    row_2.setAttribute(
        'style',
        'background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
    );
    // let row_2_name = document.createElement('td');
    // row_2_name.innerHTML = "???";
    // row_2_name.setAttribute(
    //     'style',
    //     'border-color:inherit;text-align:center;vertical-align:top;'
    // );
    // row_2.appendChild(row_2_name);
    let row_2_data = document.createElement('td');

    var str = "";
    for(var i = 3 ; i < saftyparamsArr.length;i++){
        str += saftyparamsArr[i];
    }

    row_2_data.innerHTML = str;
    row_2_data.setAttribute(
        'style',
        'border-color:inherit;text-align:center;vertical-align:top;'
    );
    row_2_data.colSpan = 5;
    row_2.appendChild(row_2_data); //특이사항 있으면 넣기
    thead.appendChild(row_1);
    thead.appendChild(row_2);

    //tbody.appendChild(row_2);

}

function drawWeightTable(tableWeight,algorithmWeight_crossWalk,algorithmWeight_facilityCar,algorithmWeight_facilityNoCar,algorithmWeight_turnPoint){  //파이어베이스에서 가중치가져와 테이블그리는 함수

    let table = document.createElement('table');
    table.setAttribute(
        'style',
        'border-collapse:collapse;border-color:#ccc;border-spacing:0;'
    );
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        table.setAttribute(
            'style',
            'border-collapse:collapse; border-color:#ccc; border-spacing:0;'
        );

        table.appendChild(thead);
        table.appendChild(tbody);

        document.getElementById('weightTable').appendChild(table);

        let row_1 = document.createElement('tr');
        
        row_1.setAttribute(
            'style',
            'text-align:center;vertical-align:top;'
        );

        let heading_1 = document.createElement('th');
        heading_1.innerHTML = "Weight";
        heading_1.setAttribute(
            'style',
            'background-color:#f0f0f0;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;'
        );
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = tableWeight;
        heading_2.setAttribute(
            'style',
            'background-color:#f0f0f0;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;'
        );

        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);

        thead.appendChild(row_1);

        let row_2 = document.createElement('tr');

        row_2.setAttribute(
            'style',
            'text-align:center;vertical-align:top;'
        );

        let name_2 = document.createElement('td');
        name_2.innerHTML = "TurnPoint"
        name_2.setAttribute(
            'style',
            'background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );
        let data_2 = document.createElement('td');
        data_2.innerHTML = algorithmWeight_turnPoint;
        data_2.setAttribute(
            'style',
            'background-color:#f9f9f9;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );

        row_2.appendChild(name_2);
        row_2.appendChild(data_2);
        
        tbody.appendChild(row_2);

        let row_3 = document.createElement('tr');
        row_3.setAttribute(
            'style',
            'text-align:center;vertical-align:top;'
        );

        let name_3 = document.createElement('td');
        name_3.innerHTML = "CrossWalk";
        name_3.setAttribute(
            'style',
            'background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );
        let data_3 = document.createElement('td');
        data_3.innerHTML = algorithmWeight_crossWalk;
        data_3.setAttribute(
            'style',
            'background-color:#f9f9f9;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );

        row_3.appendChild(name_3);
        row_3.appendChild(data_3);
        
        tbody.appendChild(row_3);

        let row_4 = document.createElement('tr');
        row_4.setAttribute(
            'style',
            'text-align:center;vertical-align:top;'
        );

        let name_4 = document.createElement('td');
        name_4.innerHTML = "DangerA";
        name_4.setAttribute(
            'style',
            'background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );
        let data_4 = document.createElement('td');
        data_4.innerHTML = algorithmWeight_facilityNoCar;
        data_4.setAttribute(
            'style',
            'background-color:#f9f9f9;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );

        row_4.appendChild(name_4);
        row_4.appendChild(data_4);
        
        tbody.appendChild(row_4);

        let row_5 = document.createElement('tr');
        row_5.setAttribute(
            'style',
            'text-align:center;vertical-align:top;'
        );

        let name_5 = document.createElement('td');
        name_5.innerHTML = "DangerB";
        name_5.setAttribute(
            'style',
            'background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );
        let data_5 = document.createElement('td');
        data_5.innerHTML =algorithmWeight_facilityCar;
        data_5.setAttribute(
            'style',
            'background-color:#f9f9f9;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );

        row_5.appendChild(name_5);
        row_5.appendChild(data_5);
        
        tbody.appendChild(row_5);
}
