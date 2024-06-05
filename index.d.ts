declare module "react-native-add-calendar-event" {
  type ISODateString = string;

  interface NavigationBarIOS {
    tintColor: string;
    barTintColor: string;
    backgroundColor: string;
    translucent: boolean;
    titleColor: string;
  }

  /** iOS ONLY - GeoFenced alarm location */
  interface AlarmStructuredLocation {
    /** The title of the location. */
    title: string;
    /** A value indicating how a location-based alarm is triggered. */
    proximity: 'enter' | 'leave' | 'none';
    /** A minimum distance from the core location that would trigger the calendar event's alarm. */
    radius: number;
    /** The geolocation coordinates, as an object with latitude and longitude properties. */
    coords: { latitude: number; longitude: number };
  }

  interface Alarm<D = ISODateString | number> {
    /** When saving an event, if a Date is given, an alarm will be set with an absolute date. If a Number is given, an alarm will be set with a relative offset (in minutes) from the start date. When reading an event this will always be an ISO Date string */
    date: D;
    /** iOS ONLY - The location to trigger an alarm. */
    structuredLocation?: AlarmStructuredLocation;
  }

  interface CreateOptions {
    title?: string;
    /**
     * in UTC, format: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
     */
    startDate?: string;
    /**
     * in UTC, format: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
     */
    endDate?: string;
    location?: string;
    allDay?: boolean;
    /**
     * iOS only
     */
    url?: string;
    /**
     * The notes (iOS) or description (Android) associated with the event.
     */
    notes?: string;
    navigationBarIOS?: NavigationBarIOS;

    /** iOS ONLY - The time zone associated with the event */
    timeZone?: string;
    /** Unique id for the calendar where the event will be saved. Defaults to the device's default  calendar. */
    calendarId?: string;
    /** The alarms associated with the calendar event, as an array of alarm objects. */
    alarms?: Array<Alarm<ISODateString | number>>;
  }

  /**
   * These are two different identifiers on iOS.
   * On Android, where they are both equal and represent the event id, also strings.
   */
  interface SuccessAction {
    action: "SAVED";
    calendarItemIdentifier: string;
    eventIdentifier: string;
  }

  interface CancelAction {
    action: "CANCELED";
  }

  interface DeletedAction {
    action: "DELETED";
  }

  interface DoneAction {
    action: "DONE";
  }

  interface RespondedAction {
    action: "RESPONDED";
  }

  type CreateResult = SuccessAction | CancelAction;

  interface EditOptions {
    /**
     * Id of edited event.
     */
    eventId: string;
    /**
     * `ACTION_EDIT` should work for editing events but this doesn't always seem to be the case.
     * This option leaves the choice up to you. By default, the module will use `ACTION_VIEW` which will only
     * show the event, but from there it is easy for the user to tap the edit button and make changes.
     */
    useEditIntent?: boolean;
    navigationBarIOS?: NavigationBarIOS;
    beginTime?: number;
    endTime?: number;
  }

  type EditResult = SuccessAction | CancelAction | DeletedAction;

  interface ViewOptions {
    /**
     * Id of edited event.
     */
    eventId: string;
    /**
     * iOS only
     * https://developer.apple.com/documentation/eventkitui/ekeventviewcontroller/1613964-allowsediting?language=objc
     */
    allowsEditing?: boolean;
    /**
     * iOS only
     * https://developer.apple.com/documentation/eventkitui/ekeventviewcontroller/1613956-allowscalendarpreview?language=objc
     */
    allowsCalendarPreview?: boolean;
    navigationBarIOS?: NavigationBarIOS;
    beginTime?: number;
    endTime?: number;
  }

  type ViewResult = DoneAction | RespondedAction | DeletedAction;

  export function presentEventCreatingDialog(
    options: CreateOptions
  ): Promise<CreateResult>;
  export function presentEventEditingDialog(
    options: EditOptions
  ): Promise<EditResult>;
  export function presentEventViewingDialog(
    options: ViewOptions
  ): Promise<ViewResult>;

}
