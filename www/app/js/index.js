'use-strict';
  
const pages={
      start : 'app/page/start.html',
      about : 'app/page/about.html',
      login : 'app/page/login.html',
      register: 'app/page/register.html',
      map: 'app/page/map.html'
  }
  
var data={
      product:'',
      lokasi:'',
      loc:'',
      category:'',
      need:80,
      pluang:'',
      radius:500
};  
  
function radius(v) {
    window.document.getElementById('radius-s').innerHTML=v;
    data.radius=v;
}
//  class render
  
  class Render{
      page(path){
          $('#root').load(path);
      }
}  
  
  const _render = new Render();
  _render.page(pages.start);
  
function startPage() {
      console.log("cek start  ");
      $('#root').load(pages.start);
  }
function aboutPage() {
      console.log("cek about");
      $('#root').load(pages.about);
  }
  
function loginPage() {
      console.log("cek login");
      $('#root').load(pages.login);
}  
  
  function registerPage() {
      console.log("cek register");
      $('#root').load(pages.register);
}  
  
  class saveData{
      
      produk(v){
          data.product = v;
          console.log(data);
          $('#business-product').text(v);
      }
  
      lokasi(v,f){
          data.lokasi = v;
          data.loc = f;
          console.log(data);
          $('#loc-jual').text(v);
      }
  
      category(c){
          data.category = c;
          console.log(data);
          $('#category-jual').text(c);
      }
  
      need(n){
          data.need = n;
          console.log(data);
          $('#need-jual').text(n);
      }
  
  }
  
var sv = new saveData();
function saveProduct() {
      var p_name = $('#product-name').val();
      sv.produk(p_name);
  }
function saveCategory() {
      var c_name = $('#category-name').val();
      sv.category(c_name);
}  
  
function setLokasiJual(alamat,loc) {
      sv.lokasi(alamat,loc);
      $("a[href='#finish']").click(function(){
          getPeluang();
      }); 
      
  
}  
  
  
  function saveNeed(per) {
      data.need=per;
      $('#need-jual').text(per);
}  



function displayHasil(pluang,lat,long) {

    //setup map
    $('#root').load(pages.map);
    $("#loader").show();

    //pin lokasi jual
    //pin lokasi lai  yang sama
    //pin keramaian
    //
    
}

  
function getPeluang() {
      var produk = data.product;
      var lat = data.loc.geometry.coordinates[0];
      var long = data.loc.geometry.coordinates[1];
      var category = data.category;
      var pluang;
      var cat;
      var prod;
      $.ajax({
  
          type : 'GET',
          url  : 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+produk+'.json?proximity='+lat+','+long+'&access_token=pk.eyJ1Ijoia3ViZWdpcyIsImEiOiJjazd1bHp1ZWMxMnhxM2xucWwyY2psbTJvIn0.xKBnJu7oqoAWuB_Ynv42GA&types=poi&limit=50',
          dataType: 'JSON',
          beforeSend: function(){
             
          },
          success :  function(response){
  
              prod = 1;

              
  
  
              
              console.log("jumlah produk"+prod);
              $.ajax({
  
                  type : 'GET',
                  url  : 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+category+'.json?proximity='+lat+','+long+'&access_token=pk.eyJ1Ijoia3ViZWdpcyIsImEiOiJjazd1bHp1ZWMxMnhxM2xucWwyY2psbTJvIn0.xKBnJu7oqoAWuB_Ynv42GA&types=poi&limit=10',
                  dataType: 'JSON',
                  beforeSend: function(){
                     
                  },
                  success :  function(response2){
                      console.log(response2);
                      cat = response2.features.length+1;
                      //console.log("jumlah kategori"+cat);
                      //pluang = ((1/prod*100)+(1/cat*100)+80)/3;
                      pluang = ((1/prod*100)+80)/3;
                      console.log(pluang);
                      data.pluang=pluang;

                      displayHasil(pluang,lat,long);
          
                  }
              
              });
  
  
              

            
            

        }
    
      });
}