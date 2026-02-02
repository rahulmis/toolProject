/**
 * Date Calculator - UI Component
 * 
 * This component provides a user-friendly interface for date calculations.
 * Business logic is imported from logic.js for separation of concerns.
 */

import React, { useState, useEffect } from 'react';
import ToolLayout from '../../../components/shared/ToolLayout';
import {
  calculateDaysBetween,
  addDaysToDate,
  subtractDaysFromDate,
  formatDateForInput,
  formatDateLong,
  formatDateWithDay,
  getToday,
  breakdownDays,
  formatDuration,
  countWeekdaysAndWeekends,
  calculatePreciseDateDifference,
  calculateBusinessDays
} from './logic';
import metadata from './metadata';

const DateCalculator = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState('between');
  
  // Tab 1: Days Between Dates
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [includeEndDate, setIncludeEndDate] = useState(false);
  const [excludeWeekends, setExcludeWeekends] = useState(false);
  
  // Tab 2: Add/Subtract Days
  const [baseDate, setBaseDate] = useState('');
  const [daysToModify, setDaysToModify] = useState('');
  const [operation, setOperation] = useState('add'); // 'add' or 'subtract'

  // Set today's date on mount
  useEffect(() => {
    const today = formatDateForInput(getToday());
    setStartDate(today);
    setBaseDate(today);
  }, []);

  // Calculate results
  const daysBetween = calculateDaysBetween(startDate, endDate, includeEndDate);
  const breakdown = breakdownDays(daysBetween);
  const weekdayWeekendCounts = countWeekdaysAndWeekends(startDate, endDate, includeEndDate);
  const preciseDiff = calculatePreciseDateDifference(startDate, endDate);
  const businessDays = calculateBusinessDays(startDate, endDate, includeEndDate);
  
  const modifiedDate = operation === 'add'
    ? addDaysToDate(baseDate, daysToModify)
    : subtractDaysFromDate(baseDate, daysToModify);

  // Tab configuration
  const tabs = [
    { id: 'between', label: 'Days Between Dates', icon: '📊' },
    { id: 'addsubtract', label: 'Add/Subtract Days', icon: '➕➖' },
  ];

  // Quick date shortcuts
  const setDateShortcut = (field, daysOffset) => {
    const today = getToday();
    const targetDate = new Date(today);
    targetDate.setDate(targetDate.getDate() + daysOffset);
    const formatted = formatDateForInput(targetDate);
    
    if (field === 'start') setStartDate(formatted);
    else if (field === 'end') setEndDate(formatted);
    else if (field === 'base') setBaseDate(formatted);
  };

  // Load examples
  const loadExample = () => {
    const today = getToday();
    
    if (activeTab === 'between') {
      const futureDate = new Date(today);
      futureDate.setDate(futureDate.getDate() + 30);
      
      setStartDate(formatDateForInput(today));
      setEndDate(formatDateForInput(futureDate));
    } else {
      setBaseDate(formatDateForInput(today));
      setDaysToModify('30');
      setOperation('add');
    }
  };

  // Clear current tab
  const clearCurrent = () => {
    const today = formatDateForInput(getToday());
    
    if (activeTab === 'between') {
      setStartDate(today);
      setEndDate('');
      setIncludeEndDate(false);
      setExcludeWeekends(false);
    } else {
      setBaseDate(today);
      setDaysToModify('');
    }
  };

  return (
    <ToolLayout
      toolId="date-calculator"
      title="Date Calculator"
      description="Calculate days between dates or add/subtract days easily. Simple date calculations for everyday use."
      toolDetails={metadata.toolDetails}
    >
      <div className="space-y-6">
        {/* Tabs */}
        <div>
          <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={loadExample}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              📝 Load Example
            </button>
            <button
              onClick={clearCurrent}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Tab 1: Days Between Two Dates */}
        {activeTab === 'between' && (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                📊 Calculate Days Between Two Dates
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Select a start date and an end date to calculate the number of days between them.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="input-field text-lg"
                />
                {startDate && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatDateWithDay(new Date(startDate))}
                  </p>
                )}
                {/* Quick shortcuts for start date */}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setDateShortcut('start', 0)}
                    className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setDateShortcut('start', -7)}
                    className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                  >
                    -7 days
                  </button>
                  <button
                    onClick={() => setDateShortcut('start', -30)}
                    className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                  >
                    -30 days
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="input-field text-lg"
                />
                {endDate && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatDateWithDay(new Date(endDate))}
                  </p>
                )}
                {/* Quick shortcuts for end date */}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setDateShortcut('end', 0)}
                    className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setDateShortcut('end', 7)}
                    className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                  >
                    +7 days
                  </button>
                  <button
                    onClick={() => setDateShortcut('end', 30)}
                    className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                  >
                    +30 days
                  </button>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                ⚙️ Options:
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeEndDate}
                    onChange={(e) => setIncludeEndDate(e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Include end date in count
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      (adds 1 day to result)
                    </span>
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={excludeWeekends}
                    onChange={(e) => setExcludeWeekends(e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Show business days only (exclude weekends)
                  </span>
                </label>
              </div>
            </div>

            {startDate && endDate && (
              <div className={`border-2 rounded-lg p-6 ${
                daysBetween >= 0
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-700'
                  : 'bg-orange-50 dark:bg-orange-900/20 border-orange-500 dark:border-orange-700'
              }`}>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {excludeWeekends ? 'Business days (weekdays only):' : 
                   daysBetween >= 0 ? 'Days from start to end:' : 'Days before start date:'}
                </div>
                <div className={`text-5xl font-bold mb-3 ${
                  daysBetween >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-orange-600 dark:text-orange-400'
                }`}>
                  {excludeWeekends 
                    ? Math.abs(businessDays).toLocaleString()
                    : Math.abs(daysBetween).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {excludeWeekends ? 'business days' : 
                   Math.abs(excludeWeekends ? businessDays : daysBetween) === 1 ? 'day' : 'days'}
                </div>

                {/* Precise Date Breakdown */}
                <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-600">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    📊 Precise Breakdown:
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {Math.abs(preciseDiff.years)} year{Math.abs(preciseDiff.years) !== 1 ? 's' : ''}, {' '}
                      {Math.abs(preciseDiff.months)} month{Math.abs(preciseDiff.months) !== 1 ? 's' : ''}, {' '}
                      {Math.abs(preciseDiff.days)} day{Math.abs(preciseDiff.days) !== 1 ? 's' : ''}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Exact calendar difference
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Total Days</div>
                      <div className="font-bold text-gray-900 dark:text-gray-100">
                        {breakdown.days.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Weeks</div>
                      <div className="font-bold text-gray-900 dark:text-gray-100">
                        {breakdown.weeks.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Months (approx)</div>
                      <div className="font-bold text-gray-900 dark:text-gray-100">
                        {breakdown.months.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  {/* Weekday/Weekend breakdown */}
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="text-blue-700 dark:text-blue-300 text-xs mb-1">Weekdays</div>
                      <div className="font-bold text-blue-900 dark:text-blue-100">
                        {weekdayWeekendCounts.weekdays.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                      <div className="text-purple-700 dark:text-purple-300 text-xs mb-1">Weekends</div>
                      <div className="font-bold text-purple-900 dark:text-purple-100">
                        {weekdayWeekendCounts.weekends.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    <strong>Approximately:</strong> {formatDuration(daysBetween)}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Add/Subtract Days */}
        {activeTab === 'addsubtract' && (
          <div className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                ➕➖ Add or Subtract Days from a Date
              </h3>
              <p className="text-sm text-purple-800 dark:text-purple-200">
                Select a base date and specify how many days to add or subtract to get the resulting date.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Base Date
              </label>
              <input
                type="date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
                className="input-field text-lg"
              />
              {baseDate && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formatDateWithDay(new Date(baseDate))}
                </p>
              )}
              {/* Quick shortcuts for base date */}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setDateShortcut('base', 0)}
                  className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded hover:bg-purple-200 dark:hover:bg-purple-800"
                >
                  Today
                </button>
                <button
                  onClick={() => setDateShortcut('base', -7)}
                  className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded hover:bg-purple-200 dark:hover:bg-purple-800"
                >
                  -7 days
                </button>
                <button
                  onClick={() => setDateShortcut('base', 7)}
                  className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded hover:bg-purple-200 dark:hover:bg-purple-800"
                >
                  +7 days
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Days
              </label>
              <input
                type="number"
                value={daysToModify}
                onChange={(e) => setDaysToModify(e.target.value)}
                placeholder="e.g., 30"
                className="input-field text-lg"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Operation:
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setOperation('add')}
                  className={`flex-1 px-6 py-4 rounded-lg font-medium transition-colors ${
                    operation === 'add'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  ➕ Add Days
                </button>
                <button
                  onClick={() => setOperation('subtract')}
                  className={`flex-1 px-6 py-4 rounded-lg font-medium transition-colors ${
                    operation === 'subtract'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  ➖ Subtract Days
                </button>
              </div>
            </div>

            {baseDate && daysToModify && modifiedDate && (
              <div className={`border-2 rounded-lg p-6 ${
                operation === 'add'
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-700'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-700'
              }`}>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Result ({operation === 'add' ? 'Adding' : 'Subtracting'} {daysToModify} days):
                </div>
                <div className={`text-4xl font-bold mb-2 ${
                  operation === 'add'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {formatDateLong(modifiedDate)}
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  {formatDateWithDay(modifiedDate)}
                </div>

                <div className="pt-4 border-t border-gray-300 dark:border-gray-600">
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <div>
                      <strong>From:</strong> {formatDateLong(new Date(baseDate))}
                    </div>
                    <div>
                      <strong>Operation:</strong> {operation === 'add' ? 'Add' : 'Subtract'} {daysToModify} days
                    </div>
                    <div>
                      <strong>To:</strong> {formatDateLong(modifiedDate)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Common Use Cases */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
            💡 Common Use Cases:
          </h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li>• <strong>Event Planning:</strong> Calculate days until an event or deadline</li>
            <li>• <strong>Project Management:</strong> Track project duration and milestones</li>
            <li>• <strong>Age Calculation:</strong> Find exact age in days</li>
            <li>• <strong>Vacation Planning:</strong> Calculate trip duration</li>
            <li>• <strong>Rental Periods:</strong> Calculate rental duration for billing</li>
            <li>• <strong>Subscription Terms:</strong> Calculate subscription end dates</li>
            <li>• <strong>Legal Deadlines:</strong> Calculate filing or response deadlines</li>
          </ul>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            📚 Quick Tips:
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Results update automatically as you select dates</li>
            <li>• Use "Load Example" to see how each calculator works</li>
            <li>• The calculator handles leap years and month lengths automatically</li>
            <li>• Click on the date input to use the calendar picker</li>
            <li>• All calculations are done in your browser - no data is sent anywhere</li>
          </ul>
        </div>
      </div>

      {/* SEO CONTENT */}
      <section className="mt-20 max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">
          How to Use the Date Calculator
        </h2>

        <p className="mb-4">
          This free online date calculator makes it easy to perform common date calculations. Whether you need to
          calculate the number of days between two dates, add days to a date, or subtract days from a date, this
          tool provides instant, accurate results.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Calculate Days Between Dates
        </h3>

        <p className="mb-4">
          Perfect for finding out how many days until an event, calculating project duration, or determining age in days.
          Simply select your start date and end date, and the calculator instantly shows the total days between them,
          along with a breakdown into weeks, months, and years.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Add or Subtract Days
        </h3>

        <p className="mb-4">
          Need to find a date 30 days from today? Or calculate a deadline 90 days from a start date? Use the Add/Subtract
          Days calculator to quickly find the resulting date. The tool automatically handles month boundaries, leap years,
          and all calendar complexities.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Real-World Applications
        </h3>

        <ul className="list-disc pl-6 mb-4">
          <li><strong>Business:</strong> Calculate payment terms, project timelines, contract periods</li>
          <li><strong>Personal:</strong> Plan vacations, track anniversaries, calculate age</li>
          <li><strong>Legal:</strong> Calculate filing deadlines, statute of limitations</li>
          <li><strong>Finance:</strong> Calculate investment holding periods, loan terms</li>
          <li><strong>Education:</strong> Track semester length, assignment due dates</li>
          <li><strong>Health:</strong> Track medication schedules, pregnancy due dates</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">
          Accurate and Reliable
        </h3>

        <p>
          This date calculator uses JavaScript's native Date API to ensure accurate calculations that properly handle
          leap years, different month lengths, and time zones. All calculations happen in your browser, so your data
          stays private and the tool works offline once loaded.
        </p>
      </section>
    </ToolLayout>
  );
};

export default DateCalculator;
