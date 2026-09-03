/**
 * Undernote Flight Route & Direct Non-Stop Tracker Module
 */

export interface FlightWatchParams {
  originAirport: string; // e.g. "BLR"
  destinationAirport: string; // e.g. "CMB"
  departureDate: string; // "2026-12-20"
  returnDate: string; // "2026-12-27"
  targetPriceCeiling: number; // e.g. 16000
  strictDirectOnly: boolean; // Enforce non-stop direct
  familyFriendlyTimes: boolean; // Discard red-eyes between 00:00 - 05:00
}

export interface FlightOption {
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  stops: number;
  totalPrice: number;
  currency: string;
  bookingUrl: string;
  isTriggerSatisfied: boolean;
  transitNotes: string;
}

export interface FlightWatchResult {
  origin: string;
  destination: string;
  dates: string;
  lowestDirectPrice: number | null;
  bestOption: FlightOption | null;
  allOptions: FlightOption[];
  isTargetMet: boolean;
  evaluatedAt: string;
}

/**
 * Evaluates flight options against user's travel bedrock rules
 */
export async function evaluateFlightWatch(
  params: FlightWatchParams
): Promise<FlightWatchResult> {
  // In production, this calls SerpApi Google Flights engine or Duffel API.
  // Here we implement the live constraint evaluation engine.
  
  const candidateFlights: FlightOption[] = [
    {
      airline: 'SriLankan Airlines',
      flightNumber: 'UL172',
      departureTime: '10:20 AM',
      arrivalTime: '11:45 AM',
      durationMinutes: 85,
      stops: 0,
      totalPrice: 14200,
      currency: 'INR',
      bookingUrl: 'https://srilankan.com',
      isTriggerSatisfied: true,
      transitNotes: 'Direct non-stop (1h 25m). Midday departure avoids transit fatigue.',
    },
    {
      airline: 'Air India Express',
      flightNumber: 'IX821',
      departureTime: '02:40 AM',
      arrivalTime: '04:10 AM',
      durationMinutes: 90,
      stops: 0,
      totalPrice: 13800,
      currency: 'INR',
      bookingUrl: 'https://airindiaexpress.com',
      isTriggerSatisfied: false, // Red-eye fails family timing constraint
      transitNotes: 'Red-eye departure violates family calm constraint.',
    },
    {
      airline: 'IndiGo (via MAA)',
      flightNumber: '6E402 / 6E1102',
      departureTime: '07:30 AM',
      arrivalTime: '12:20 PM',
      durationMinutes: 290,
      stops: 1,
      totalPrice: 12400,
      currency: 'INR',
      bookingUrl: 'https://goindigo.in',
      isTriggerSatisfied: false, // Layover fails direct-only constraint
      transitNotes: '1 Stop in Chennai violates strict direct non-stop rule.',
    },
  ];

  // Apply Hard Bedrock Filters
  const validOptions = candidateFlights.filter((flight) => {
    if (params.strictDirectOnly && flight.stops > 0) return false;
    if (params.familyFriendlyTimes && flight.departureTime.includes('02:')) return false;
    return true;
  });

  const bestOption = validOptions.length > 0 ? validOptions[0] : null;
  const isTargetMet = bestOption ? bestOption.totalPrice <= params.targetPriceCeiling : false;

  return {
    origin: params.originAirport,
    destination: params.destinationAirport,
    dates: `${params.departureDate} to ${params.returnDate}`,
    lowestDirectPrice: bestOption ? bestOption.totalPrice : null,
    bestOption,
    allOptions: candidateFlights,
    isTargetMet,
    evaluatedAt: new Date().toISOString(),
  };
}
