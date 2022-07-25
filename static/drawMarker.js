        //MQTT관련 변수
        var mqtt; 
      var reconnectTimeout = 2000;
      
      var host = "15.165.174.55"
       // var host = "172.20.10.6"
      var port = 9001;
      var isConnected = false;

        //Tmap지도 관련 변수
        var index = 0;
        var startMap,resMap;
        var markers = []; 

        /*------------------MQTT--------------------*/ 
      function onConnect(){
         console.log("접속 완료");
         isConnected = true;

            subscribe("des");
         subscribe("topic");
            subscribe("vibe");
            //subscribe("route");
            subscribe("route_res");
            subscribe("now");     
            subscribe("midpoint");      
      }
      
      function onFailure(message){
         console.log("접속 실패");
         setTimeout( mqttConnection,reconnectTimeout);
      }
      
      function onMessageArrived(msg){
            switch(msg.destinationName){

                
                case "des":            
                document.getElementById("topic").innerHTML += '목적지: ' + msg.payloadString + '</span><br/>';
                break;

                //출력되는 메시지
                case "topic":  
                    document.getElementById("topic").innerHTML += msg.payloadString + '</span><br/>';
                break;

                case "vibe":
                    if(msg.payloadString == "start"){
                        Running();
                        document.getElementById("topic").innerHTML += "방향을 찾는 중입니다" + '</span><br/>';
                    }
                    else if(msg.payloadString =="end"){
                        Paused();
                        document.getElementById("topic").innerHTML += "방향을 찾았습니다" + '</span><br/>';
                    }
                    else if(msg.payloadString =="stop"){
                        Paused();
                    }

                break;

              

                //4가지 경로
                case "route":
                    //console.log("route " + msg.payloadString);
                    if(msg.payloadString == "restart"){

                        $('input:radio[name=myname]').prop('checked',false);

                        $('#realMap1').css('display','block');
                    $('#finalMap').css('display','block');

                       var realMap1 =  document.getElementById("realMap1");
                       realMap1.removeChild( realMap1.firstChild ); 
                       var finalMap =  document.getElementById("finalMap");
                        finalMap.removeChild( finalMap.firstChild ); 

                        break;
                    }
                    else if (msg.payloadString == "out"){
                        var realMap1 =  document.getElementById("realMap1");
                        realMap1.removeChild( realMap1.firstChild ); 
                        var finalMap =  document.getElementById("finalMap");
                        finalMap.removeChild( finalMap.firstChild ); 
                        document.getElementById("topic").innerHTML += "경로를 이탈하여 목적지를 재검색합니다" + '</span><br/>';
                        break;
                    }

                    var arr_lat = [];
                    var arr_lon = [];
                    var split = msg.payloadString.split("!"); 

                    for(var i = 0 ; i < split.length ; i++){
                        //box = [];
                        var box = split[i].split("/")
                        arr_lat[i] = box[0];
                        arr_lon[i] = box[1];
                    }
                    drawRealMap(arr_lat,arr_lon);

                    document.getElementById("both").checked= true;

                    break;
                    

                //알고리즘으로 고른 경로
                case "midpoint":
                    var lat_res = [];
                    var lon_res = [];
                    
                    //console.log("midpoint " + msg.payloadString);
                    var split =[];
                    split = msg.payloadString.split('/');

                    lat_res = split[0].split(',');
                    lon_res = split[1].split(',');
                   
                  
                    var midMap = drawResMapMid(lat_res,lon_res);
                    addStartEndMarker(lat_res,lon_res,midMap);
                    drawMarker(midMap,lat_res,lon_res);
               
                    break;
                
                    //미드포인트 없는 최종 루트
                case "route_res":
                    
                    var lat_res = [];
                    var lon_res = [];
                    
                    console.log(msg.payloadString);
                    var split =[];
                    split = msg.payloadString.split('/');

                    lat_res = split[0].split(',');
                    lon_res = split[1].split(',');
                   
                    resMap = drawResMap(lat_res,lon_res);
                    addStartEndMarker(lat_res,lon_res,resMap);
                    drawMarker(resMap,lat_res,lon_res);
                   // document.getElementById("topic").innerHTML += "알고리즘으로 선택된 길과 현재위치를 볼려면 라디오 버튼을 클릭하세요" + '</span><br/>';
               
                    break;

               
                case "now":  

                console.log("now " + msg.payloadString);
                var arr_now = msg.payloadString.split(','); 

                addCurrentMarker(resMap,arr_now[0],arr_now[1]);
                break;

            }
    }
   
      function onConnectionLost(responseObject) { 
         console.log("접속 끊김");
         if (responseObject.errorCode !== 0) {
            console.log("접속 끊긴 이유:" + responseObject.errorMessage);
         }
      }
      
      var topicSave;
      function subscribe(topic) {
          if(mqtt == null) return;
          if(isConnected != true) {
              topicSave = topic;
              window.setTimeout("subscribe(topicSave)", 500);
              return
          }

          mqtt.subscribe(topic); 
      }

      
      function mqttConnection(){
         
         mqtt = new Paho.MQTT.Client(host,port,"javascript_client");
         
         var options = {
               timeout:3,
               onSuccess:onConnect, 
               onFailure:onFailure
         };
         
         mqtt.onMessageArrived =  onMessageArrived;
         mqtt.onConnectionLost = onConnectionLost;
         
         mqtt.connect(options);
      }
        


    /*------------Tmap 지도------------*/ 

        //마커를 그리는 지도
        function drawMarker(map,lat,lon){
            // var centerLat = (lat[0] + lat[length-1])/2
            // var centerLon = (lon[0] + lon[length-1])/2

            // map = new Tmapv2.Map("map_div",  // "map_div" : 지도가 표시될 div의 id
            // {
            //     center: new Tmapv2.LatLng(centerLat,centerLon), // 지도 초기 좌표
            //     width: "890px", 
            //     height: "400px",
            //     zoom: 14
            // });
            //Marker 객체 생성.
            for(var i = 0 ; i < lat.length ; i++ ){
                var marker = new Tmapv2.Marker({
                position: new Tmapv2.LatLng(lat[i],lon[i]), //Marker의 중심좌표 설정.
                map: map //Marker가 표시될 Map 설정..
            });
            }
        }
        //경로 4가지 그리는 지도
        function drawRealMap(arr_lat,arr_lon){  
            var lat1 = arr_lat[0].split(",");
            var lon1 = arr_lon[0].split(",");      
            
            var i = Math.floor((lat1.length/2)); 
            var latitude =  lat1[i];
            var longitude = lon1[i];

           var map = new Tmapv2.Map("realMap1",  
            {
                center: new Tmapv2.LatLng(latitude,longitude),
                width: "890px", 
                height: "400px",
                zoom: 14,
                draggable: false
            });
            
            for(var j = 0 ; j < arr_lat.length ; j++ ){
                var line_lat = [];
                var line_lon = [];

                line_lat = arr_lat[j].split(",");
                line_lon = arr_lon[j].split(",");

                var ar_line = [];
                var color = ["#00FFFF","#FF1493", "#2F4F4F", "#ADFF2F"];

                for (var k = 0; k < line_lat.length; k++) {
                var startPt = new Tmapv2.LatLng(line_lat[k],line_lon[k]);
                ar_line.push(startPt);
             }
                var polyline = new Tmapv2.Polyline({
                path: ar_line, 
                strokeColor: color[j],
                strokeWeight: 5,
                map: map
                });
            }

        } 

        //최종경로 + 현재 위치 찍는 지도
        function drawResMap(lat,lon){        

            var i = Math.floor((lat.length/2)); 
            var latitude =  lat[i];
            var longitude = lon[i];

            var map = new Tmapv2.Map("realMap1",  
            {
                center: new Tmapv2.LatLng(latitude,longitude),
                width: "890px", 
                height: "400px",
                zoom: 15,
                draggable: true
            });

            var ar_line = [];
            for (var j = 0; j < lat.length; j++) {
            var startPt = new Tmapv2.LatLng(lat[j],lon[j]);
            ar_line.push(startPt);
         }
            var polyline = new Tmapv2.Polyline({
            path: ar_line, 
            strokeColor: "#DC143C",
            strokeWeight: 5,
            map: map
            });

            return map;
        } 

        function drawResMapMid(lat,lon){        

            var i = Math.floor((lat.length/2)); 
            var latitude =  lat[i];
            var longitude = lon[i];

            var map = new Tmapv2.Map("finalMap",  
            {
                center: new Tmapv2.LatLng(latitude,longitude),
                width: "890px", 
                height: "400px",
                zoom: 15,
                draggable: true
            });

            var ar_line = [];
            for (var j = 0; j < lat.length; j++) {
            var startPt = new Tmapv2.LatLng(lat[j],lon[j]);
            ar_line.push(startPt);
         }
            var polyline = new Tmapv2.Polyline({
            path: ar_line, 
            strokeColor: "#DC143C",
            strokeWeight: 5,
            map: map
            });

            return map;
        } 

    //출발,도착 지점 마커 
   function addStartEndMarker(lat,lon,resMap) {

        var positions = [
        {
             title: 'Start', 
             lonlat: new Tmapv2.LatLng(lat[0],lon[0]),
             imgURL : 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png'
         },
         {
             title: 'End', 
             lonlat: new Tmapv2.LatLng(lat[lat.length-1],lon[lon.length-1]),
            imgURL : 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png'
         }
        ];

        for (var i = 0; i< positions.length; i++){
            var lonlat = positions[i].lonlat;
            var title = positions[i].title;
            var imgURL = positions[i].imgURL;

            marker = new Tmapv2.Marker({
                position : lonlat, 
                map : resMap,
                icon : imgURL,
                title : title,
                animation: Tmapv2.MarkerOptions.ANIMATE_BALLOON, 
                animationLength: 800, 
            });
        }    
          
   }

    //현재위치 마커
    function addCurrentMarker(resMap,lat,lon){
        removeMarkers();
       
        marker = new Tmapv2.Marker({
            position :  new Tmapv2.LatLng(lat,lon), 
            map : resMap, 
            title : "I'm here", 
            icon: "http://tmapapi.sktelecom.com/resources/images/common/pin_car.png",
            animation:Tmapv2.MarkerOptions.ANIMATE_BOUNCE, 
            animationLength: 800, 
        });

        markers.push(marker);
    }

    function removeMarkers() {
      for (var i = 0; i < markers.length; i++) {
         markers[i].setMap(null);
      }
       markers = [];
    }


    //워치이미지 모션관련 함수
    function Running(){
        document.getElementById('img').className='RunningAnimation';
    }

    function Paused(){
        document.getElementById('img').className='PausedAnimation';
    }

   
     