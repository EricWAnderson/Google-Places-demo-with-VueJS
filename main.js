
// Vue Material Design
Vue.use(VueMaterial)

// our Vue
var places = new Vue({
  el: '#places',
  data: {
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
    name: '',
    phone: '',
    website: '',
    open_hours: [],
    photos: [],
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
    getPlace: function() {
      const place = autocomplete.getPlace();
      console.log(place);

      this.name = place.name;
      this.phone = place.formatted_phone_number;
      this.website = place.website;

      if (place.opening_hours) {
        this.open_hours = place.opening_hours.weekday_text.slice(0);
      };

      if (place.photos) {
        place.photos.forEach(photo => {
          this.photos.push({height: photo.height, width: photo.width, url: photo.getUrl({'maxWidth': 250, 'maxHeight': 250}) });
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
    displayCause: function() {
      this.showPhotos = false;
      this.showCauses = true;
    }
  }
});
