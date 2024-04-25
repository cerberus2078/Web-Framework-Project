function confirmDelete(userID) {
  if (confirm("Are you sure you want to delete this reservation?")) {
    fetch(`/admin-crud-update/delete/${userID}?_method=DELETE`, {
      method: "POST", // Use POST method as method-override is enabled
    })
      .then((response) => {
        if (response.ok) {
          console.log("User deleted successfully");
          location.reload(); // Reload the page after successful deletion
        } else {
          throw new Error("Failed to delete user");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to delete user");
      });
  } else {
    console.log("Reservation was not deleted");
  }
}
