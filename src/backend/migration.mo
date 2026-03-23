import Map "mo:core/Map";
import Time "mo:core/Time";
import Nat "mo:core/Nat";

module {
  // Old types
  type OldReservation = {
    guestName : Text;
    date : Text;
    time : Text;
    partySize : Nat;
    specialNotes : Text;
    createdAt : Time.Time;
  };

  // New types
  type ReservationStatus = {
    #pending;
    #confirmed;
    #cancelled;
  };

  type NewReservation = {
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

  // State types
  type OldActor = {
    nextId : Nat;
    reservations : Map.Map<Nat, OldReservation>;
  };

  type NewActor = {
    nextId : Nat;
    reservations : Map.Map<Nat, NewReservation>;
  };

  // Migration function
  public func run(old : OldActor) : NewActor {
    let newReservations = old.reservations.map<Nat, OldReservation, NewReservation>(
      func(_id, oldReservation) {
        {
          oldReservation with
          email = "";
          phone = "";
          status = #pending;
        };
      }
    );
    {
      old with
      reservations = newReservations;
    };
  };
};
