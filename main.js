
// Vue Material Design
Vue.use(VueMaterial)

// our Vue
var places = new Vue({
  el: '#places',
  data: {
    signUpStep: 'Business Sign Up',
    address: {
      street_number: '',
      route: '',
      locality: '',
      administrative_area_level_1: '',
      postal_code: ''
    },
    showAddress: false,
    showPhotos: false,
    showCauses: false,
    showConfirm: false,
    name: '',
    phone: '',
    website: '',
    open_hours: [],
    open_now: false,
    photos: [],
    photoUrl: '',
    causes: ['American Cancer Society', 'Paws for Paws', 'DAV']
  },
  methods: {
    initAutocomplete: function() {
      autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        { types: ['establishment'] }
      );

      autocomplete.addListener('place_changed', this.getPlace);
    },
    resetData: function() {
      this.signUpStep = 'Business Sign Up',
      this.address = {
        street_number: '',
        route: '',
        locality: '',
        administrative_area_level_1: '',
        postal_code: ''
      },
      this.showAddress = false,
      this.showPhotos = false,
      this.showCauses = false,
      this.showConfirm = false,
      this.name = '',
      this.phone = '',
      this.website = '',
      this.open_hours = [],
      this.open_now = false,
      this.photos = [],
      this.photoUrl = ''
    },
    getPlace: function() {
      this.resetData();

      const place = autocomplete.getPlace();
      console.log(place);

      this.name = place.name;
      this.phone = place.formatted_phone_number;
      this.website = place.website;

      if (place.opening_hours) {
        this.open_now = place.opening_hours.open_now;
        this.open_hours = place.opening_hours.weekday_text.slice(0);
      };

      if (place.photos) {
        place.photos.forEach(photo => {
          this.photos.push({height: photo.height, width: photo.width, url: photo.getUrl({'maxWidth': 500, 'maxHeight': 500}) });
        });
      }

      place.address_components.forEach(component => {
        const addressType = component.types[0];

        if (addressType in this.address) {
          this.address[addressType] = component['short_name'];
        }
      });

      this.showAddress = true;
    },
    displayPhotos: function() {
      this.showAddress = false;
      this.showPhotos = true;
    },
    displayCause: function(photoUrl) {
      this.photoUrl = photoUrl,
      this.showPhotos = false;
      this.showCauses = true;
    },
    displayConfirm: function() {
      this.signUpStep = 'Welcome to DIVI!'
      this.showCauses = false;
      this.showConfirm = true;
    }
  }
});
