function cancelBooking(id) {
  let json = JSON.stringify({booking_id: id});

  let xhr = new XMLHttpRequest();
  xhr.open('PUT', `/api/bookings/${id}`);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

  xhr.addEventListener('load', () => {
    if (xhr.status === 204) {
      alert(`Booking with id ${id} cancelled succesfully`);
    } else if (xhr.status === 404) {
      alert('There is no booking on the schedule. Review id');
    }
  });

  xhr.send(json);
}

function cancelSchedule(id) {
  let json = JSON.stringify({schedule_id: id});

  let xhr = new XMLHttpRequest();
  xhr.open('DELETE', `/api/schedules/${id}`);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

  xhr.addEventListener('load', () => {
    if (xhr.status === 204) {
      alert(`Schedule with id ${id} cancelled succesfully`);
    } else {
      alert(xhr.responseText);
    }
  });

  xhr.send(json);
}