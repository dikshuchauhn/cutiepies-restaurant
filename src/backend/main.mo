import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Migration "migration";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Apply data migration at upgrade
(with migration = Migration.run)
actor {
  // Types
  type ReservationStatus = {
    #pending;
    #confirmed;
    #cancelled;
  };

  type Reservation = {
    guestName : Text;
    email : Text;
    phone : Text;
    date : Text;
    time : Text;
    partySize : Nat;
    specialNotes : Text;
    status : ReservationStatus;
    createdAt : Time.Time;
  };

  type ReservationInput = {
    guestName : Text;
    email : Text;
    phone : Text;
    date : Text;
    time : Text;
    partySize : Nat;
    specialNotes : Text;
  };

  type ReservationUpdate = {
    guestName : Text;
    email : Text;
    phone : Text;
    date : Text;
    time : Text;
    partySize : Nat;
    specialNotes : Text;
    status : ReservationStatus;
  };

  type UpdateStatus = {
    #confirmed;
    #cancelled;
  };

  public type UserProfile = {
    name : Text;
  };

  var nextId = 0;
  let reservations = Map.empty<Nat, Reservation>();

  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profiles
  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Compare function for Reservation (sorting by createdAt timestamp)
  func compareReservations(a : Reservation, b : Reservation) : { #less; #equal; #greater } {
    Int.compare(a.createdAt, b.createdAt);
  };

  // Public query to get a single reservation by ID - ADMIN ONLY for privacy
  public query ({ caller }) func getReservation(id : Nat) : async ?Reservation {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view reservation details");
    };
    reservations.get(id);
  };

  // Public query to get all confirmed reservations (public view)
  public query ({ caller }) func getConfirmedReservations() : async [Reservation] {
    reservations.values().filter(func(reservation) { reservation.status == #confirmed }).toArray();
  };

  // Admin query to get all reservations
  public query ({ caller }) func getAllReservations() : async [Reservation] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all reservations");
    };
    let sortedReservations = reservations.values().toArray().sort(compareReservations);
    sortedReservations;
  };

  // Public shared function to create a reservation (pending status)
  public shared ({ caller }) func createReservation(input : ReservationInput) : async Nat {
    let reservation : Reservation = {
      input with
      status = #pending;
      createdAt = Time.now();
    };
    reservations.add(nextId, reservation);
    let id = nextId;
    nextId += 1;
    id;
  };

  // Admin shared function to update reservation status (confirmed/cancelled)
  public shared ({ caller }) func updateReservationStatus(id : Nat, newStatus : UpdateStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update reservation status");
    };
    switch (reservations.get(id)) {
      case (null) { Runtime.trap("Reservation not found") };
      case (?reservation) {
        let updatedReservation : Reservation = {
          reservation with
          status =
            switch (newStatus) {
              case (#confirmed) { #confirmed };
              case (#cancelled) { #cancelled };
            };
        };
        reservations.add(id, updatedReservation);
      };
    };
  };

  // Admin shared function to delete a reservation
  public shared ({ caller }) func deleteReservation(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete reservations");
    };
    if (not reservations.containsKey(id)) {
      Runtime.trap("Reservation not found");
    };
    reservations.remove(id);
  };

  // Admin shared function to update a reservation completely
  public shared ({ caller }) func updateReservation(id : Nat, update : ReservationUpdate) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update reservations");
    };
    switch (reservations.get(id)) {
      case (null) { Runtime.trap("Reservation not found!") };
      case (?oldReservation) {
        let newReservation : Reservation = { update with createdAt = oldReservation.createdAt };
        reservations.add(id, newReservation);
      };
    };
  };

  // Admin shared function to confirm a reservation
  public shared ({ caller }) func confirmReservation(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can confirm reservations");
    };
    switch (reservations.get(id)) {
      case (null) { Runtime.trap("Reservation not found") };
      case (?reservation) {
        let updatedReservation : Reservation = {
          reservation with status = #confirmed;
        };
        reservations.add(id, updatedReservation);
      };
    };
  };

  // Admin shared function to cancel a reservation
  public shared ({ caller }) func cancelReservation(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can cancel reservations");
    };
    switch (reservations.get(id)) {
      case (null) { Runtime.trap("Reservation not found") };
      case (?reservation) {
        let updatedReservation : Reservation = {
          reservation with status = #cancelled;
        };
        reservations.add(id, updatedReservation);
      };
    };
  };

  // Query to get reservations by guest name - ADMIN ONLY
  public query ({ caller }) func getReservationsByGuestName(name : Text) : async [Reservation] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can search reservations by guest name");
    };
    reservations.values().filter(func(reservation) { reservation.guestName.toLower().contains(#text (name.toLower())) }).toArray();
  };

  // Query to get reservations by date - ADMIN ONLY
  public query ({ caller }) func getReservationsByDate(date : Text) : async [Reservation] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view reservations by date");
    };
    reservations.values().filter(func(reservation) { reservation.date == date }).toArray();
  };

  // Query to get reservations by status - ADMIN ONLY
  public query ({ caller }) func getReservationsByStatus(status : ReservationStatus) : async [Reservation] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view reservations by status");
    };
    reservations.values().filter(func(reservation) { reservation.status == status }).toArray();
  };

  // Query to get all pending reservations - ADMIN ONLY
  public query ({ caller }) func getPendingReservations() : async [Reservation] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view pending reservations");
    };
    reservations.values().filter(func(reservation) { reservation.status == #pending }).toArray();
  };

  // Query to get all cancelled reservations - ADMIN ONLY
  public query ({ caller }) func getCancelledReservations() : async [Reservation] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view cancelled reservations");
    };
    reservations.values().filter(func(reservation) { reservation.status == #cancelled }).toArray();
  };

  // Query to get reservations by party size - ADMIN ONLY
  public query ({ caller }) func getReservationsByPartySize(size : Nat) : async [Reservation] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view reservations by party size");
    };
    reservations.values().filter(func(reservation) { reservation.partySize == size }).toArray();
  };

  // Query to get upcoming reservations (sorted by date) - ADMIN ONLY
  public query ({ caller }) func getUpcomingReservations() : async [Reservation] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view upcoming reservations");
    };
    reservations.values().toArray().sort(compareReservations);
  };

  // Query to get reservation counts by status - ADMIN ONLY
  public query ({ caller }) func getReservationCountsByStatus() : async {
    confirmed : Nat;
    pending : Nat;
    cancelled : Nat;
  } {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view reservation statistics");
    };
    var confirmed = 0;
    var pending = 0;
    var cancelled = 0;

    reservations.values().forEach(
      func(reservation) {
        switch (reservation.status) {
          case (#confirmed) { confirmed += 1 };
          case (#pending) { pending += 1 };
          case (#cancelled) { cancelled += 1 };
        };
      }
    );

    { confirmed; pending; cancelled };
  };

  // Query to get total reservations by date - ADMIN ONLY
  public query ({ caller }) func getReservationCountsByDate(date : Text) : async {
    confirmed : Nat;
    pending : Nat;
    cancelled : Nat;
  } {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view reservation statistics by date");
    };
    var confirmed = 0;
    var pending = 0;
    var cancelled = 0;

    reservations.values().forEach(
      func(reservation) {
        if (reservation.date == date) {
          switch (reservation.status) {
            case (#confirmed) { confirmed += 1 };
            case (#pending) { pending += 1 };
            case (#cancelled) { cancelled += 1 };
          };
        };
      }
    );

    { confirmed; pending; cancelled };
  };
};
