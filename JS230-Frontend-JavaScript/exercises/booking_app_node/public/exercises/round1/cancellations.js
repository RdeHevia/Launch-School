/*
cancel schedules
*/

function cancelSchedule (id) {
  let xhr = new XMLHttpRequest();
  xhr.open('DELETE', `/api/schedules/${id}`);
  xhr.addEventListener('load', () => {
    if (xhr.status === 204) {
      alert('Schedule deleted.');
    } else {
      alert(`Deleing failed: ${xhr.responseText}`);
    }
  });

  xhr.send();
}

/*
cancel bookings
*/

function cancelBooking(id) {
  let xhr = new XMLHttpRequest();
  xhr.open('PUT', `/api/bookings/${id}`);
  xhr.addEventListener('load', () => {
    if (xhr.status === 204) {
      alert('Schedule deleted.');
    } else {
      alert(`Canceling failed: ${xhr.responseText}`);
    }
  });
  xhr.send();
}