import Swal from "sweetalert2";

export function alert(message, type, timer) {
    Swal.fire({
        title: message,
        icon: type,
        confirmButtonText: 'Ok',
        timer: timer ? timer : false
    })
}

export const deleteWarning = (onDelete, id) =>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            onDelete(id)
            Swal.fire({
                title: "Deleted!",
                text: "Your data has been deleted.",
                icon: "success"
            });
        }
      });
}