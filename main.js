const businessDetails = ['name', 'formatted_phone_number', 'website'];

const addressComponents = {
  street_number: 'long_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  postal_code: 'short_name'
};

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'),
    { types: ['establishment'] }
  );

  autocomplete.addListener('place_changed', fillInForm);
}

function fillInForm() {
  const place = autocomplete.getPlace();
  console.log(place);

  businessDetails.forEach(detail => {
    document.getElementById(detail).value = place[detail];
  });

  place.address_components.forEach(component => {
    const addressType = component.types[0]

    if (addressComponents[addressType]) {
      const val = component[addressComponents[addressType]];
      document.getElementById(addressType).value = val;
    }
  });
}

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      const circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });

      autocomplete.setBounds(circle.getBounds());
    });
  }
}
