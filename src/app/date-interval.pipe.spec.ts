import { DateIntervalPipe } from './pipes/date-interval.pipe';

describe('DateIntervalPipe', () => {
  it('create an instance', () => {
    const pipe = new DateIntervalPipe();
    expect(pipe).toBeTruthy();
  });
});
