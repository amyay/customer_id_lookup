(function() {
  return {

    // dummy data
    dummyKundeID: '69034202',
    dummyKundenavn: 'Kunt Egner',
    dummyGateadresse: 'Nordheimbakken 13A',
    dummyPostnummer: '0378',
    dummyPoststed: 'Oslo',
    dummyepost: 'Kunt.Egner@gmail.com',
    dummyMobil: '99526528',
    dummyHub: '12345',
    dummyNode: '12345',
    dummyAlert: 'Her vises en driftsmelding',
    dummyNotes: 'Her viser vi et notat',

    dummyKundeID2: '25729402',
    dummyKundenavn2: 'Dummy Person',
    dummyGateadresse2: '123 Some Street',
    dummyPostnummer2: '87654',
    dummyPoststed2: 'Sity',
    dummyepost2: 'dummy.person@gmail.com',
    dummyMobil2: '58592323334',
    dummyHub2: '33333',
    dummyNode2: '55555',
    dummyAlert2: 'Some alert for dummy 2',
    dummyNotes2: 'Some notes for dummy 2',

    dummyKundeID3: '55502228',
    dummyKundenavn3: 'John Doe',
    dummyGateadresse3: '456 Someother Avenue',
    dummyPostnummer3: '99471',
    dummyPoststed3: 'Citti',
    dummyepost3: 'john.doe@gmail.com',
    dummyMobil3: '7638450522',
    dummyHub3: '99999',
    dummyNode3: '88888',
    dummyAlert3: 'Some alert for dummy 3',
    dummyNotes3: 'Some notes for dummy 3',



    // global variables
    CustomFieldIDs: [],
    CustomerList: [],
    thereAreNulls: [undefined, null, '', '-'],

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
      'app.activated'                           : 'init',
      // 'taskPost.fail': 'notifyError',
      // 'taskPost.done': 'UpdateCustField',
      'click #download_data'                    : 'validateForm',
      'click .btn_copy_customer_data'           : 'copyCustomerData',
      'click .btn_prev'                         : 'displayPreviousCustomerData',
      'click .btn_next'                         : 'displayNextCustomerData'

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

    validateForm: function(event) {

      // initialize index
      this.currentCustomerIndex = 0;

      event.preventDefault();
      var name = this.$('#customerID')[0];
      if (name.value.length < 8) {
        services.notify('Fyll inn gyldig kundenummer.', 'error');
      }
      else {                  // good to go
        // console.log("in validateForm: in else");
        this.sendFormData();
      }
    },

    sendFormData: function() {
      var new_task = {
        data: {
          customerid: this.$('#customerID').val()
        }
      };
      //this.ajax('taskPost', new_task);
      // hack : show update fields
      this.displayCustomerData();
    },

    displayCustomerData: function() {
console.log ('in displaycustomerdata()');
console.log ('currentCustomerIndex =', this.currentCustomerIndex);

      // display search results
      this.switchTo('customer_search_results', {
        customerID: this.CustomerList[this.currentCustomerIndex].KundeID,
        customerName: this.CustomerList[this.currentCustomerIndex].Kundenavn,
        customerEmail: this.CustomerList[this.currentCustomerIndex].epost,
        customerMobile: this.CustomerList[this.currentCustomerIndex].Mobil,
        customerStreetAddress: this.CustomerList[this.currentCustomerIndex].Gateadresse,
        customerZipCode: this.CustomerList[this.currentCustomerIndex].Postnummer,
        customerCity: this.CustomerList[this.currentCustomerIndex].Poststed,
        customerHub: this.CustomerList[this.currentCustomerIndex].Hub,
        customerNode: this.CustomerList[this.currentCustomerIndex].Node,
        customerAlert: this.CustomerList[this.currentCustomerIndex].Alert,
        customerNotes: this.CustomerList[this.currentCustomerIndex].Notes,
        current_customer_index: this.currentCustomerIndex+1,
        number_of_results: this.CustomerList.length
      });

      // hide buttons accordingly
      if (this.currentCustomerIndex === 0) {
        this.$('.btn_prev').css('visibility', 'hidden');
        // this.$('.btn_prev').attr('disabled','disabled');
      }

      if (this.currentCustomerIndex == this.CustomerList.length-1) {
        this.$('.btn_next').css('visibility', 'hidden');
        // this.$('.btn_next').attr('disabled','disabled');
      }
    },

    displayPreviousCustomerData: function() {
      if (this.currentCustomerIndex > 0) {
        this.currentCustomerIndex --;
      }
      this.displayCustomerData();
    },

    displayNextCustomerData: function() {
      if (this.currentCustomerIndex < this.CustomerList.length-1) {
        this.currentCustomerIndex ++;
      }
      this.displayCustomerData();
    },

    copyCustomerData: function() {
      // update the fields with dummy data
      if (_.indexOf(this.thereAreNulls, this.ticket().customField(this.KundeID)) !== -1)
      {
        this.ticket().customField(this.KundeID, this.CustomerList[this.currentCustomerIndex].KundeID);

        // set ticket requester
        this.ticket().requester({
          email: this.CustomerList[this.currentCustomerIndex].epost,
          name: this.CustomerList[this.currentCustomerIndex].Kundenavn
        });

        // continue to do add the rest of the fields
        if (_.indexOf(this.thereAreNulls, this.ticket().customField(this.Kundenavn)) !== -1)
        {
          this.ticket().customField(this.Kundenavn, this.CustomerList[this.currentCustomerIndex].Kundenavn);
        }

        if (_.indexOf(this.thereAreNulls, this.ticket().customField(this.Gateadresse)) !== -1)
        {
          this.ticket().customField(this.Gateadresse, this.CustomerList[this.currentCustomerIndex].Gateadresse);
        }
        if (_.indexOf(this.thereAreNulls, this.ticket().customField(this.Postnummer)) !== -1)
        {
          this.ticket().customField(this.Postnummer, this.CustomerList[this.currentCustomerIndex].Postnummer);
        }
        if (_.indexOf(this.thereAreNulls, this.ticket().customField(this.Poststed)) !== -1)
        {
          this.ticket().customField(this.Poststed, this.CustomerList[this.currentCustomerIndex].Poststed);
        }
        if (_.indexOf(this.thereAreNulls, this.ticket().customField(this.epost)) !== -1)
        {
          this.ticket().customField(this.epost, this.CustomerList[this.currentCustomerIndex].epost);
        }
        if (_.indexOf(this.thereAreNulls, this.ticket().customField(this.Mobil)) !== -1)
        {
          this.ticket().customField(this.Mobil, this.CustomerList[this.currentCustomerIndex].Mobil);
        }
        if (_.indexOf(this.thereAreNulls, this.ticket().customField(this.Hub)) !== -1)
        {
          this.ticket().customField(this.Hub, this.CustomerList[this.currentCustomerIndex].Hub);
        }
        if (_.indexOf(this.thereAreNulls, this.ticket().customField(this.Node)) !== -1)
        {
          this.ticket().customField(this.Node, this.CustomerList[this.currentCustomerIndex].Node);
        }
      }
      else {
        // field already defined. do not do anything
console.log ('in copyCustomerData(): fields already defined. not copying...');
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

      // doing it the dumb way
      // push 3 sets of dummy data into customer list

      var customerObject = {
        "KundeID"       : this.dummyKundeID,
        "Kundenavn"     : this.dummyKundenavn,
        "Gateadresse"   : this.dummyGateadresse,
        "Postnummer"    : this.dummyPostnummer,
        "Poststed"      : this.dummyPoststed,
        "epost"         : this.dummyepost,
        "Mobil"         : this.dummyMobil,
        "Hub"           : this.dummyHub,
        "Node"          : this.dummyNode,
        "Alert"         : this.dummyAlert,
        "Notes"         : this.dummyNotes
      };

      this.CustomerList.push(customerObject);

      customerObject = {
        "KundeID"       : this.dummyKundeID2,
        "Kundenavn"     : this.dummyKundenavn2,
        "Gateadresse"   : this.dummyGateadresse2,
        "Postnummer"    : this.dummyPostnummer2,
        "Poststed"      : this.dummyPoststed2,
        "epost"         : this.dummyepost2,
        "Mobil"         : this.dummyMobil2,
        "Hub"           : this.dummyHub2,
        "Node"          : this.dummyNode2,
        "Alert"         : this.dummyAlert2,
        "Notes"         : this.dummyNotes2
      };
      this.CustomerList.push(customerObject);

      customerObject = {
        "KundeID"       : this.dummyKundeID3,
        "Kundenavn"     : this.dummyKundenavn3,
        "Gateadresse"   : this.dummyGateadresse3,
        "Postnummer"    : this.dummyPostnummer3,
        "Poststed"      : this.dummyPoststed3,
        "epost"         : this.dummyepost3,
        "Mobil"         : this.dummyMobil3,
        "Hub"           : this.dummyHub3,
        "Node"          : this.dummyNode3,
        "Alert"         : this.dummyAlert3,
        "Notes"         : this.dummyNotes3
      };
      this.CustomerList.push(customerObject);


console.log('CustomerList', this.CustomerList);

      // this.switchTo('taskform');
    }
  };
}());
