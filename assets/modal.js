$(function() {
  var client = ZAFClient.init();

  client.invoke('resize', {
    width: '40vw', height: '60vh'
  });

  // same data as main.js
  var cars = [{
    "vin": "2NPLLD0X37M615298",
    "tahun": "2017",
    "merek": "Toyota",
    "model": "Kijang All New Innova",
    "warna": "Black",
    "tipe": "G Bensin M/T",
    "tanggal_beli": "18/07/2017",
    "cc": "1998",
    "bahan_bakar": "Bensin",
    "tipe_mesin": "1 TR-FE, 16 Valve, DOHC with Dual VVT-i",
    "sistem_roda": "RWD (Penggerak Roda Belakang)",
    "photo_url": "https://imgcdn.rajamobil.com/resize2/public/media/images/databasemobil/mobilbaru/color/all-%20new-innova-avant-garde-bronze.png",
    "nama_pembeli": "Bob Smith",
    "id_pembeli": "49325",
    "cabang": "Sunter",
    "nama_sales": "Mr. P"
  }, {
    "vin": "KNDJT2A58D7607696",
    "tahun": "2016",
    "merek": "Isuzu",
    "model": "Panther",
    "warna": "Silver",
    "tipe": "Smart FF",
    "tanggal_beli": "05/04/2016",
    "cc": "2499",
    "bahan_bakar": "Diesel",
    "tipe_mesin": "4JA1-L",
    "sistem_roda": "RWD (Penggerak Roda Belakang)",
    "photo_url": "https://imgcdn.rajamobil.com/resize2/public/media/images/databasemobil/mobilbaru/color/isuzu-panther-black-metallic.png",
    "nama_pembeli": "John Doe",
    "id_pembeli": "80398",
    "cabang": "Sunter",
    "nama_sales": "Mr. X"
  }, {
    "vin": "2G1WF55E229100175",
    "tahun": "2016",
    "merek": "Toyota",
    "model": "Fortuner",
    "warna": "Super White",
    "tipe": "2.7 G Lux 4x2",
    "tanggal_beli": "11/10/2016",
    "cc": "2694",
    "bahan_bakar": "Bensin",
    "tipe_mesin": "2TR-FE",
    "sistem_roda": "RWD (Penggerak Roda Belakang)",
    "photo_url": "https://imgcdn.rajamobil.com/resize2/public/media/images/databasemobil/mobilbaru/color/Fortuner-New%20super%20white%20II.jpg",
    "nama_pembeli": "Jane Doe",
    "id_pembeli": "34355",
    "cabang": "Bandung",
    "nama_sales": "Ms. K"
  }, {
    "vin": "1NXBR18E0XZ778348",
    "tahun": "2017",
    "merek": "BMW",
    "model": "Seri X3",
    "warna": "White",
    "tipe": "Smart FF",
    "tanggal_beli": "01/03/2017",
    "cc": "1997",
    "bahan_bakar": "Bensin",
    "tipe_mesin": "BMW TwinPower Turbo Petrol Engines",
    "sistem_roda": "FWD (Penggerak Roda Depan)",
    "photo_url": "https://imgcdn.rajamobil.com/resize2/public/media/images/databasemobil/mobilbaru/color/bmw-x3-alpine-white.png",
    "nama_pembeli": "John Doe",
    "id_pembeli": "80398",
    "cabang": "Sunter",
    "nama_sales": "Mr. X"
  }];

  client.on('app.registered', init);

  function init(){
    var params = parseParams(window.location.hash);
    // console.log(params);
    showCompleteInfo(cars, params.vin_number);
  };

  function parseParams(param_string){
    var param_sub = param_string.replace('#','').split('&');
    var kv = param_sub[0].split('=');
    var param_obj = {}
    param_obj[kv[0]] = kv[1];
    return param_obj;
  };

  function showCompleteInfo(cars, vin) {
    var carObj = {};
    for (var i = 0; i < cars.length; i++) {
      if (cars[i].vin == vin) {
        carObj = cars[i];
      }
    }

    var car_data = {
      'img': carObj.photo_url,
      'vin': vin,
      'tahun': carObj.tahun,
      'merek': carObj.merek,
      'model': carObj.model,
      'warna': carObj.warna,
      'tipe': carObj.tipe,
      'tanggal_beli': carObj.tanggal_beli,
      'cc': carObj.cc,
      'bahan_bakar': carObj.bahan_bakar,
      'tipe_mesin': carObj.tipe_mesin,
      'sistem_roda': carObj.sistem_roda,
      'nama_pembeli': carObj.nama_pembeli,
      'cabang': carObj.cabang,
      'nama_sales': carObj.nama_sales,
    }

    Handlebars.registerHelper('slot', function(obj) {
      var result = '';
      result += '<img src="' + obj + '"width="50%"></img>';
      return new Handlebars.SafeString(result);
    });

    var source = $("#requester-template").html();
    var template = Handlebars.compile(source);
    var html = template(car_data);
    $("#contentmodal").html(html);
  }
});
