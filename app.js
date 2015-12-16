(function() {
  return {
    requests:
    {
      taskPost: function(new_task) {
        var Input_CustomerID = this.$('#name').val();
        return
        {
          url: 'http://dummywebsite/test.asp?type=9&var1=123&var2=',
          type: 'POST',
          ContentType: 'text/plain',
          data: {
            "email": Input_CustomerID
          }
        };
      },
    },

    events:
    {
      'taskPost.fail': 'notifyError',
      'taskPost.done': 'UpdateCustField',
      'click #my-btn': 'validateForm',
      'app.activated':'showForm'
    },

    notifyError: function() {
      services.notify('Problem with the POST request.', 'error');
    },

    UpdateCustField: function() {
      var ticket = this.ticket();
      var Input_CustomerID = this.$('#name').val();
      if (ticket.customField("custom_field_24661362") === "" || ticket.customField("custom_field_24661362") === undefined)
      {
        ticket.customField("custom_field_24661362", Input_CustomerID);
      }
    },

    sendFormData: function() {
      var new_task = { data: { customerid: this.$('#name').val()} };
      this.ajax('taskPost', new_task);
    },

    validateForm: function(event) {
      event.preventDefault();
      var name = this.$('#name')[0];
      if (name.value.length < 8) {
        services.notify('Fyll inn gyldig kundenummer.', 'error');
      }
      else {                  // good to go
        this.sendFormData();
      }
    },


    showForm: function() {
      this.switchTo('task_form');
    }
  };
}());
