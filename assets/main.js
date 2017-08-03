// User Field --> customer_id

$(function() {
  var client = ZAFClient.init();

  client.invoke('resize', {
      width: '100%',
      height: '120px'
  });

  // dummy data. This should be list of all cars in database
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

  function init() {
    client.get('ticket.requester.id').then(function(data) {
    	var user_id = data['ticket.requester.id'];
    	requestUserInfo(client, user_id);
    });
  }

  function requestUserInfo(client, id) {
    var settings = {
      url: '/api/v2/users/' + id + '.json',
      type:'GET',
      dataType: 'json',
    };

    client.request(settings).then(
      function(data) {
      	showInfo(data, cars);
      },
      function(response) {
      	showError(response);
      }
    );
  }

  function showInfo(data, cars) {
    var vinObj = {};
    var id = data.user.user_fields.customer_id;
    var VINs = [];

    for (var i = 0; i < cars.length; i++) {
      if (cars[i].id_pembeli == id) {
        vinObj[cars[i].vin] = cars[i];
        VINs.push(cars[i].vin);
      }
    }

    // Sort the VINs by Descending order of transaction date
    VINs.sort(function (a, b) {
      var d1 = vinObj[a].tanggal_beli.split('/');
      var d2 = vinObj[b].tanggal_beli.split('/');
      return Date.UTC(d2[2], d2[1] - 1, d2[0]) - Date.UTC(d1[2], d1[1] - 1, d1[0]);
    });

  	var requester_data = {
      'car': VINs
    };

    Handlebars.registerHelper('slot', function(obj) {
      var result = '';
      for (var i = 0; i < obj.length; i++) {
        var carData = vinObj[obj[i]];
        var carName = carData.merek + " " + carData.model;
        result += '<tr class="data" data-vin-number="' + obj[i] + '">';
        result += '<td>' + carName + '</td>';
        result += '<td>' + carData.tanggal_beli + '</td>';
        result += '</tr>';
      }
      return new Handlebars.SafeString(result);
    });

    var source = $("#requester-template").html();
    var template = Handlebars.compile(source);
    var html = template(requester_data);
    $("#content").html(html);
    addRowOnClick(client);
  }

  function showError() {
    var error_data = {
      'status': 404,
      'statusText': 'Data not found'
    };
    var source = $("#error-template").html();
    var template = Handlebars.compile(source);
    var html = template(error_data);
    $("#content").html(html);
  }

  function addRowOnClick(row) {
    var rows = document.getElementsByClassName("data");
    for (var i = 0; i < rows.length; i++) {
      rows[i].onclick = function () {
        var vin = this.getAttribute("data-vin-number");
        var options = {
          location: "modal",
          url: "assets/modal.html#vin_number=" + vin
        }
        client.invoke('instances.create', options);
      }
    }
  }
});
