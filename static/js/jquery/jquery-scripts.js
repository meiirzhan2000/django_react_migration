$(document).ready(function() {
    // Example jQuery functionality
    $('#jquery-load-data').click(function() {
        // Show loading state with Bootstrap spinner
        $('#jquery-data-container').html('<div class="d-flex justify-content-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>');

        // Fetch data from API
        $.ajax({
            url: '/api/data/',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                // Display data with Bootstrap styling
                var html = '<div class="items-list">';
                $.each(data.items, function(index, item) {
                    html += '<div class="item">' +
                            '<h3>' + item.name + '</h3>' +
                            '<p class="text-muted">' + item.description + '</p>' +
                            '<button class="btn btn-sm btn-outline-primary view-details" data-id="' + item.id + '">View Details</button>' +
                            '</div>';
                });
                html += '</div>';

                $('#jquery-data-container').html(html);

                // Trigger a custom event that React can listen to
                $(document).trigger('jqueryDataLoaded', [data]);
            },
            error: function(xhr, status, error) {
                $('#jquery-data-container').html('<p>Error loading data: ' + error + '</p>');
            }
        });
    });

    // Function that can be called from React
    window.jQueryFunction = function(message) {
        // Use Bootstrap modal instead of alert
        var modalHTML = '<div class="modal fade" id="jqueryModal" tabindex="-1" aria-hidden="true">' +
                        '<div class="modal-dialog">' +
                        '<div class="modal-content">' +
                        '<div class="modal-header">' +
                        '<h5 class="modal-title">Message from React</h5>' +
                        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
                        '</div>' +
                        '<div class="modal-body"><p>' + message + '</p></div>' +
                        '<div class="modal-footer">' +
                        '<button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>' +
                        '</div></div></div></div>';

        // Append modal to body if it doesn't exist
        if ($('#jqueryModal').length === 0) {
            $('body').append(modalHTML);
        } else {
            $('#jqueryModal .modal-body').html('<p>' + message + '</p>');
        }

        // Show the modal
        var modal = new bootstrap.Modal(document.getElementById('jqueryModal'));
        modal.show();

        return 'Response from jQuery!';
    };

    // Add event handler for the view details buttons (added dynamically)
    $(document).on('click', '.view-details', function() {
        var itemId = $(this).data('id');
        var itemName = $(this).closest('.item').find('h3').text();

        // Create a Bootstrap toast notification
        var toastHTML = '<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">' +
                        '<div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">' +
                        '<div class="toast-header">' +
                        '<strong class="me-auto">Item Details</strong>' +
                        '<small>Just now</small>' +
                        '<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>' +
                        '</div>' +
                        '<div class="toast-body">You selected item #' + itemId + ': ' + itemName + '</div>' +
                        '</div></div>';

        // Add toast to the document
        if ($('#liveToast').length === 0) {
            $('body').append(toastHTML);
        } else {
            $('.toast-body').html('You selected item #' + itemId + ': ' + itemName);
        }

        // Show the toast
        var toastEl = document.getElementById('liveToast');
        var toast = new bootstrap.Toast(toastEl);
        toast.show();
    });
});