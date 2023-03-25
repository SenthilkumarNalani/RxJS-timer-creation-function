import { timer, Observable } from 'rxjs';

// The 'timer' creation function allows us to create an Observable which will wait some time, emit a value and complete. We can compare it to the well known 'setTimeout' function.
// This Observable produces a new timer for each new Subscription, so let's subscribe to it.
// Our new timer starts counting and after the provided time, in our case(example), two thousand milliseconds, which is two seconds, a next notification will be emitted with the value '0'. We'll see what the '0' is about soon.
// Also, a complete notification is emitted which ends the Subscription as the timer has completed its objective.

// Output: We can see that the app has started and after two seconds, we see that our Observable emitted a value of '0' and then immediately completed, exactly as expected.
// App started!
// 0
// Completed

// Example 1: timer - creation function or creation operator
// console.log('App started!');

// timer(2000).subscribe({
//   next: (value) => console.log(value),
//   complete: () => console.log('Completed'),
// });

// Example 2: timer unsubscribe or cancel before it emits next notification
// The app has started and nothing happens, and that's OK, that's because we've unsubscribed and unsubscribing actually cancelled the timer. That's the desired behavior as Observables should clean up after themselves when the Subscription ends.
// Output:
// App started!

// console.log('App started!');

// const subscription = timer(2000).subscribe({
//   next: (value) => console.log(value),
//   complete: () => console.log('Completed'),
// });

// setTimeout(() => {
//   subscription.unsubscribe();
// }, 1000);

// Example 3: timer(mimic) = polyfill or custom creation function
// Note: If no teardown logic then the ouput would be as below
// App started!
// Unsubscribe
// Timeout!

// So we need to improve our Observable so we wouldn't have any memory leaks or unexpected side effects when using our Observables.
// To achieve this, we need to provide some teardown logic. We can do it by returning a function from observable logic and this function would be run whenever the Subscription ends.
// And as we know, the Subscription ends when we unsubscribe or when the Observable emits an error or completes.

// Output: Correct output after implementing teardown logic
// App started!
// Unsubscribe
console.log('App started!');
const $timer = new Observable<number>((subscriber) => {
  const timeoutId = setTimeout(() => {
    console.log('Timeout!');
    subscriber.next(0);
    subscriber.complete();
  }, 2000);
  // the timeout cancellation implementation goes inside teardown logic
  return () => clearTimeout(timeoutId);
});

const subscription = $timer.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('Completed'),
});

setTimeout(() => {
  subscription.unsubscribe();
  console.log('Unsubscribe');
}, 1000);
