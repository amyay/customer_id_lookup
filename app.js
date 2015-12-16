(function() {
  return {

    // dummy data
    //dummyKundeID: ,
    dummyKundenavn: 'Kunt Egner',
    dummyGateadresse: 'Nordheimbakken 13A',
    dummyPostnummer: '0378',
    dummyPoststed: 'Oslo',
    dummyepost: 'Kunt.Egner@gmail.com',
    dummyMobil: '99526528',
    dummyHub: '12345',
    dummyNode: '12345',

    // global variables
    CustomFieldIDs: [],

    requests:
    {
      taskPost: function(new_task) {
        var Input_CustomerID = this.$('#name').val();
        return {
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
      'app.activated': 'init',
      // 'taskPost.fail': 'notifyError',
      // 'taskPost.done': 'UpdateCustField',
      'click #my-btn': 'validateForm'
    },

    // notifyError: function() {
    //   services.notify('Problem with the POST request.', 'error');
    // },

    // UpdateCustField: function() {
    //   var ticket = this.ticket();

    //   var Input_CustomerID = this.$('#name').val();
    //   if (ticket.customField("custom_field_24661362") === "" || ticket.customField("custom_field_24661362") === undefined)
    //   {
    //     ticket.customField("custom_field_24661362", Input_CustomerID);
    //   }
    // },

    UpdateCustField_dummy: function() {

      // update the fields with dummy data
      if (this.ticket().customField(this.KundeID) === "" || this.ticket().customField(this.KundeID) === undefined)
      {
        this.ticket().customField(this.KundeID, this.$('#customerID').val());
      }

      if (this.ticket().customField(this.Kundenavn) === "" || this.ticket().customField(this.Kundenavn) === undefined)
      {
        this.ticket().customField(this.Kundenavn, this.dummyKundenavn);
      }

      if (this.ticket().customField(this.Gateadresse) === "" || this.ticket().customField(this.Ga) === undefined)
      {
        this.ticket().customField(this.Gateadresse, this.dummyGateadresse);
      }

      if (this.ticket().customField(this.Postnummer) === "" || this.ticket().customField(this.Postn) === undefined)
      {
        this.ticket().customField(this.Postnummer, this.dummyPostnummer);
      }

      if (this.ticket().customField(this.Poststed) === "" || this.ticket().customField(this.Poststed) === undefined)
      {
        this.ticket().customField(this.Poststed, this.dummyPoststed);
      }

      if (this.ticket().customField(this.epost) === "" || this.ticket().customField(this.epost) === undefined)
      {
        this.ticket().customField(this.epost, this.dummyepost);
      }

      if (this.ticket().customField(this.Mobil) === "" || this.ticket().customField(this.Mobil) === undefined)
      {
        this.ticket().customField(this.Mobil, this.dummyMobil);
      }

      if (this.ticket().customField(this.Hub) === "" || this.ticket().customField(this.Hub) === undefined)
      {
        this.ticket().customField(this.Hub, this.dummyHub);
      }

      if (this.ticket().customField(this.Node) === "" || this.ticket().customField(this.Node) === undefined)
      {
        this.ticket().customField(this.Node, this.dummyNode);
      }

      this.switchTo('customer_search_results', {
        customerName: this.dummyKundenavn,
        customerEmail: this.dummyepost,
        customerMobile: this.dummyMobil,
        customerStreetAddress: this.dummyGateadresse,
        customerZipCode: this.dummyPostnummer,
        customerCity: this.dummyPoststed
      });
    },

    sendFormData: function() {
      var new_task = {
        data: {
          customerid: this.$('#customerID').val()
        }
      };
      //this.ajax('taskPost', new_task);
      // hack : show update fields
      this.UpdateCustField_dummy();
    },

    validateForm: function(event) {
      event.preventDefault();
      var name = this.$('#customerID')[0];
      if (name.value.length < 8) {
        services.notify('Fyll inn gyldig kundenummer.', 'error');
      }
      else {                  // good to go
        console.log("in validateForm: in else");
        this.sendFormData();
      }
    },

    // helper function: check to see if a particular custom field is present
    // i.e. defined and visible
    customFieldPresent: function (field_id) {
      // first check to see if the ticket field is defined / present or not
      if (this.ticketFields("custom_field_"+field_id) !== undefined) {
        // console.log("in customFieldPresent(): custom_field"+field_id+" is defined");
        // next check to see if custom field is visible or not (CFA hides fields)
        if (this.ticketFields("custom_field_"+field_id).isVisible()) {
          // console.log("in customFieldPresent(): custom_field_"+field_id+" is visible");
          return true;
        }
        else{
          // custom field is not visible
          return false;
        }
      }
      else {
        // custom field is not defined
        return false;
      }
    },

    init: function() {
      // initialize custom fields from settings
      this.KundeID = 'custom_field_' + this.settings.KundeID;
      this.Kundenavn = 'custom_field_' + this.settings.Kundenavn;
      this.Gateadresse = 'custom_field_' + this.settings.Gateadresse;
      this.Postnummer = 'custom_field_' + this.settings.Postnummer;
      this.Poststed = 'custom_field_' + this.settings.Poststed;
      this.epost = 'custom_field_' + this.settings.epost;
      this.Mobil = 'custom_field_' + this.settings.Mobil;
      this.Hub = 'custom_field_' + this.settings.Hub;
      this.Node = 'custom_field_' + this.settings.Node;

      // push all custom field IDs into an array
      this.CustomFieldIDs.push(this.settings.KundeID);
      this.CustomFieldIDs.push(this.settings.Kundenavn);
      this.CustomFieldIDs.push(this.settings.Gateadresse);
      this.CustomFieldIDs.push(this.settings.Postnummer);
      this.CustomFieldIDs.push(this.settings.Poststed);
      this.CustomFieldIDs.push(this.settings.epost);
      this.CustomFieldIDs.push(this.settings.Mobil);
      this.CustomFieldIDs.push(this.settings.Hub);
      this.CustomFieldIDs.push(this.settings.Node);

      console.log ("in init, CustomFieldIDs: ", this.CustomFieldIDs);

      // check to see if fields are defined
      for (var i = 0; i < this.CustomFieldIDs.length; i++) {
        if (!this.customFieldPresent(this.CustomFieldIDs[i])) {
          services.notify("Custom field ID "+this.CustomFieldIDs[i]+" is undefined.\nPlease try again", 'error');
          return false;
        }
      }

      // disable user interactions
      this.ticketFields(this.KundeID).disable();
      this.ticketFields(this.Kundenavn).disable();
      this.ticketFields(this.Gateadresse).disable();
      this.ticketFields(this.Postnummer).disable();
      this.ticketFields(this.Poststed).disable();
      this.ticketFields(this.epost).disable();
      this.ticketFields(this.Mobil).disable();
      this.ticketFields(this.Hub).disable();
      this.ticketFields(this.Node).disable();

      // this.switchTo('taskform');
    }
  };
}());
