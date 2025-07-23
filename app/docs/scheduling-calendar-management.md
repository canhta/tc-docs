# Scheduling & Calendar Management PRD

## 1. Business Overview

### Business Purpose
The Scheduling & Calendar Management system serves as the operational coordination hub for the TC platform, managing lesson bookings, teacher availability, resource allocation, and calendar synchronization. It optimizes resource utilization while providing flexible scheduling options for all stakeholders.

### Value Proposition
- **Intelligent Scheduling**: AI-powered scheduling optimization for maximum resource utilization
- **Conflict Resolution**: Automated conflict detection and resolution with alternative suggestions
- **Multi-Calendar Integration**: Seamless synchronization with Google Calendar, Outlook, and other platforms
- **Flexible Booking**: Multiple booking options including recurring lessons, one-time sessions, and group classes
- **Resource Optimization**: Efficient room and equipment allocation with utilization analytics
- **Automated Notifications**: Comprehensive reminder and notification system for all stakeholders

### Business Impact
- **Utilization Optimization**: 85% improvement in teacher and room utilization rates
- **Administrative Efficiency**: 70% reduction in manual scheduling tasks through automation
- **Customer Satisfaction**: 90% satisfaction rate with flexible booking and rescheduling options
- **Revenue Maximization**: 25% increase in lesson bookings through optimized availability management
- **Operational Reliability**: 99% scheduling accuracy with automated conflict prevention

### Key Stakeholders
- **Students**: Lesson booking and schedule management
- **Teachers**: Availability management and lesson coordination
- **School Administrators**: Resource allocation and operational oversight
- **Parents**: Student schedule monitoring and coordination
- **Room/Resource Managers**: Facility and equipment scheduling

## 2. User Roles & Scheduling Permissions

### 2.1 Student Booking Rights
**Business Purpose**: Enable students to book, manage, and reschedule lessons according to their needs and availability.

**Booking Capabilities**:
- **Lesson Booking**: Schedule individual lessons with preferred teachers
- **Recurring Schedules**: Set up weekly or bi-weekly recurring lesson patterns
- **Rescheduling**: Modify existing bookings within policy guidelines
- **Cancellation**: Cancel lessons with appropriate notice periods
- **Availability Viewing**: Browse teacher availability and optimal booking times
- **Group Class Enrollment**: Join group lessons and ensemble classes

**Scheduling Constraints**:
- Advance booking requirements and maximum booking windows
- Cancellation notice periods with penalty structures
- Rescheduling limitations and frequency restrictions
- Teacher-specific booking rules and preferences

### 2.2 Teacher Availability Management
**Business Purpose**: Provide teachers with comprehensive control over their availability and lesson scheduling.

**Availability Control**:
- **Schedule Management**: Set regular availability patterns and recurring schedules
- **Time Blocking**: Block time for preparation, breaks, and administrative tasks
- **Exception Handling**: Manage holidays, sick days, and special events
- **Substitute Coordination**: Arrange substitute teachers for unavailable periods
- **Preference Settings**: Configure booking preferences and student assignment rules
- **Calendar Integration**: Sync with personal calendars for comprehensive schedule management

**Student Management**:
- View and manage all assigned student schedules
- Approve or modify student booking requests
- Coordinate group lesson scheduling and enrollment
- Track lesson completion and attendance records

### 2.3 Administrative Scheduling Oversight
**Business Purpose**: Provide comprehensive scheduling oversight and resource management capabilities.

**Resource Management**:
- **Room Allocation**: Assign and manage practice rooms and teaching spaces
- **Equipment Scheduling**: Coordinate instrument and equipment usage
- **Teacher Assignment**: Optimize teacher-student matching and workload distribution
- **Capacity Planning**: Monitor and manage overall scheduling capacity
- **Conflict Resolution**: Resolve scheduling conflicts and resource disputes
- **Performance Analytics**: Track scheduling efficiency and utilization metrics

## 3. Advanced Business Workflows & Scheduling Orchestration

### 3.1 Comprehensive Lesson Booking & Scheduling Engine

#### **Multi-Type Recurring Schedule Generation**
```
Business Logic: SaveRecuringByType(StudentSchedule obj, int scheduleTypeId, int lessonPackage, ...)

Advanced Recurring Schedule Framework:
1. Schedule Type Analysis: Determines recurring pattern (daily, weekly, bi-weekly, monthly)
2. Package Integration: Links scheduling with lesson packages and billing cycles
3. Payment Coordination: Integrates with payment processing for recurring billing
4. Conflict Detection: Validates against existing schedules and teacher availability
5. Resource Allocation: Assigns rooms and equipment for recurring lessons

Recurring Pattern Generation:
IF (scheduleTypeId == PlanType.Daily) THEN
    FOR i = 0 TO 15 DO
        nextLesson = currentLesson.AddDays(1)
        ValidateAndCreateLesson(nextLesson)
    END FOR
ELSE IF (scheduleTypeId == PlanType.Weekly) THEN
    FOR i = 0 TO 3 DO
        nextLesson = currentLesson.AddDays(7)
        ValidateAndCreateLesson(nextLesson)
    END FOR
ELSE IF (scheduleTypeId == PlanType.BeWeekly) THEN
    FOR i = 0 TO 2 DO
        nextLesson = currentLesson.AddDays(14)
        ValidateAndCreateLesson(nextLesson)
    END FOR
END IF

Integration with Billing:
- StudentPlanHistory linkage for payment tracking
- Billing date coordination with lesson schedules
- Package lesson counting and expiration management
- Prorated billing for partial recurring periods
```

#### **Advanced Availability Checking & Conflict Resolution**
```
Business Logic: LessonAvailabilityPickerCheck(planId, teacherId, startTime, offset)

Intelligent Availability Validation:
1. Plan Analysis: Retrieves lesson duration and scheduling requirements
2. Time Calculation: Converts client timezone to UTC for accurate scheduling
3. Conflict Detection: Checks against existing teacher schedules and commitments
4. Future Projection: Validates availability for recurring lesson patterns
5. Resource Verification: Ensures room and equipment availability

Availability Algorithm:
plan = GetByPlanId(planId)
lessonDuration = TimeSpan(0, plan.LengthOfTime, 0)
clientTime = DateTime.Parse(startTime).Add(TimeSpan(0, offset, 0))

Generate Future Lesson Times:
IF (plan.TypeID == PlanType.SingleLesson) THEN
    scheduleTimes = [clientTime]
ELSE IF (plan.TypeID == PlanType.Weekly) THEN
    FOR i = 0 TO 3 DO
        scheduleTimes.Add(clientTime.AddDays(7 * i))
    END FOR
END IF

Conflict Detection:
existingSchedules = GetStudentSchedulesByTeacherId(teacherId, dateRange)
FOR EACH proposedTime IN scheduleTimes DO
    FOR EACH existingSchedule IN existingSchedules DO
        IF (TimeOverlap(proposedTime, existingSchedule)) THEN
            RETURN FALSE (Conflict detected)
        END IF
    END FOR
END FOR
RETURN TRUE (Available)
```

#### **Lesson Banking & Make-Up Scheduling Workflows**
```
Business Logic: Advanced Lesson Banking System with Business Rules

Lesson Banking Orchestration:
UpdateBankLesson(studentPlanId, bankStatusId, startTime, endTime, studentId, teacherId, ...):
1. Banking Eligibility: Validates lesson qualifies for banking based on cancellation policies
2. Credit Calculation: Determines banking credit amount based on lesson type and timing
3. Expiration Management: Sets banking expiration dates based on school policies
4. Teacher Compensation: Calculates teacher payment for banked lessons
5. Billing Adjustment: Adjusts student billing to reflect banked lesson credits

Banking Business Rules:
IF (CancellationNotice >= PolicyMinimumHours) THEN
    BankingEligible = TRUE
    BankingCredit = LessonRate * BankingMultiplier (typically 0.8-1.0)
    ExpirationDate = BankingDate + SchoolBankingPolicy.ExpirationPeriod
ELSE IF (CancellationReason == "TeacherCancel") THEN
    BankingEligible = TRUE
    BankingCredit = LessonRate * 1.0 (Full credit)
    ExpirationDate = BankingDate + ExtendedExpirationPeriod
ELSE
    BankingEligible = FALSE
    PenaltyApplied = TRUE
END IF

Banked Lesson Utilization:
GetBankedLessonForCalendar(studentId, teacherId, groupId, userType):
- Retrieves available banked lessons for scheduling
- Applies expiration date filtering
- Prioritizes oldest banked lessons for use
- Integrates with booking system for seamless redemption
- Maintains audit trail for banking transactions
```

### 3.2 Advanced Group Lesson Scheduling & Coordination

#### **Group Lesson Conflict Detection & Management**
```
Business Logic: CheckGroupLessonExistTimeWithOtherTeacher(groupId, teacherId, startTime, endTime, timeOffset)

Group Scheduling Validation Framework:
1. Teacher Conflict Detection: Ensures no scheduling conflicts with other teachers for the same group
2. Timezone Adjustment: Applies client timezone offset for accurate scheduling
3. Cross-Teacher Coordination: Validates group lessons don't overlap across different teachers
4. Resource Allocation: Ensures adequate room capacity for group lessons
5. Student Availability: Validates all group members are available for proposed time

Group Conflict Resolution Algorithm:
IF (teacherId > 0 AND groupId > 0) THEN
    IF (timeOffset > 0) THEN
        adjustedStartTime = startTime.AddMinutes(-timeOffset)
        adjustedEndTime = endTime.AddMinutes(-timeOffset)
    END IF

    conflictingLessons = GetListGroupLessonScheduleExistTimeOtherTeacher(groupId, teacherId, adjustedStartTime, adjustedEndTime)
    IF (conflictingLessons.Count > 0) THEN
        RETURN TRUE (Conflict detected)
    END IF
END IF
RETURN FALSE (No conflicts)

Business Justification:
- Prevents double-booking of group lessons with multiple teachers
- Ensures optimal resource utilization for group activities
- Maintains scheduling integrity across complex group lesson structures
```

#### **Intelligent Time Slot Locking & Reservation System**
```
Business Logic: LessonAvailabilityPickerLock(planId, teacherId, startTime, offset, sessionId)

Advanced Reservation Management:
1. Temporary Slot Locking: Reserves time slots during booking process to prevent conflicts
2. Session-Based Locking: Uses session identifiers to manage concurrent booking attempts
3. Automatic Expiration: Releases locked slots after timeout period (15 minutes default)
4. Memory Management: Maintains efficient in-memory cache of locked time slots
5. Conflict Prevention: Prevents race conditions during simultaneous booking attempts

Locking Algorithm:
BlockTimeDic[teacherId] = Dictionary\<string, BlockTimeItem\>
lockTimeout = 15_MINUTES

IF (!BlockTimeDic.ContainsKey(teacherId)) THEN
    CreateNewLockDictionary(teacherId)
    blockTimes = GetBlockTime(planId, startTime)
    FOR EACH blockTime IN blockTimes DO
        BlockTimeDic[teacherId][blockTime] = {
            ExpireAt: DateTime.UtcNow.AddMinutes(lockTimeout),
            BySession: sessionId
        }
    END FOR
    RETURN TRUE (Successfully locked)
END IF

Cleanup and Maintenance:
IF (BlockTimeDic[teacherId].Count > 200) THEN
    expiredLocks = GetExpiredLocks(BlockTimeDic[teacherId])
    RemoveExpiredLocks(expiredLocks)
END IF

Business Benefits:
- Prevents booking conflicts during high-traffic periods
- Provides smooth user experience during lesson booking
- Optimizes system performance with intelligent memory management
```

### 3.3 Student-Initiated Booking Process
1. **Availability Discovery**:
   - Student accesses teacher availability calendar with real-time updates
   - Filters available times by preferred days, times, and lesson duration
   - Views teacher profiles, specialties, and student reviews
   - Checks lesson pricing and package options

2. **Booking Selection**:
   - Student selects preferred time slot and confirms lesson details
   - System validates availability and checks for scheduling conflicts
   - Booking confirmation with automatic calendar entry creation
   - Payment processing for lesson fees (if required)

3. **Confirmation & Integration**:
   - Booking confirmation sent to student and teacher
   - Calendar invitations generated for all participants
   - Room and resource allocation completed automatically
   - Reminder notifications scheduled for lesson approach

#### Recurring Lesson Setup
1. **Pattern Configuration**:
   - Student selects recurring lesson frequency (weekly, bi-weekly, monthly)
   - Defines lesson duration, preferred time slots, and end date
   - System identifies optimal recurring schedule based on availability
   - Conflict detection and alternative suggestion generation

2. **Bulk Scheduling**:
   - Automated creation of recurring lesson series
   - Resource allocation for entire lesson series
   - Payment plan setup for recurring billing
   - Comprehensive calendar integration and synchronization

3. **Series Management**:
   - Individual lesson modification within recurring series
   - Exception handling for holidays and special events
   - Series cancellation and refund processing
   - Automatic rescheduling for teacher unavailability

### 3.2 Schedule Modification & Conflict Resolution

#### Rescheduling Process
1. **Modification Request**:
   - Student or teacher initiates rescheduling request
   - System validates modification against cancellation policies
   - Alternative time slot suggestions based on mutual availability
   - Impact assessment on other scheduled lessons and resources

2. **Approval Workflow**:
   - Automatic approval for policy-compliant modifications
   - Manual approval required for policy exceptions
   - Notification to all affected parties with new schedule details
   - Calendar updates and resource reallocation

3. **Conflict Resolution**:
   - Automated detection of scheduling conflicts
   - Priority-based conflict resolution with stakeholder notification
   - Alternative solution generation and stakeholder communication
   - Escalation procedures for complex conflicts requiring manual intervention

#### Cancellation Management
1. **Cancellation Request Processing**:
   - Cancellation request validation against notice period requirements
   - Fee calculation based on cancellation timing and policies
   - Resource release and availability restoration
   - Refund processing according to established policies

2. **Impact Management**:
   - Notification to all affected parties
   - Resource reallocation and availability updates
   - Waitlist processing for released time slots
   - Makeup lesson scheduling for policy-eligible cancellations

### 3.3 Resource Allocation & Optimization

#### Room & Equipment Management
1. **Resource Assignment**:
   - Automatic room assignment based on lesson type and requirements
   - Equipment allocation for specialized lessons (piano, drums, recording)
   - Conflict detection and alternative resource suggestion
   - Utilization optimization across all available resources

2. **Maintenance Scheduling**:
   - Scheduled maintenance windows with resource unavailability
   - Emergency maintenance handling with lesson rescheduling
   - Equipment replacement and upgrade scheduling
   - Facility improvement project coordination

#### Capacity Planning & Analytics
1. **Utilization Monitoring**:
   - Real-time tracking of teacher, room, and equipment utilization
   - Peak usage identification and capacity optimization
   - Underutilized resource identification and reallocation
   - Demand forecasting and capacity planning

2. **Performance Optimization**:
   - Scheduling efficiency metrics and improvement identification
   - Teacher workload balancing and optimization
   - Student satisfaction tracking and schedule preference analysis
   - Revenue optimization through strategic scheduling

## 4. Business Rules & Logic

### 4.1 Conflict Detection & Resolution Algorithms

#### **Schedule Conflict Validation**
```
Business Logic: GetConflickScheduleWithInputTime(teacherId, utcStartTime, utcEndTime, curStudentPlanId)
- Teacher Availability: Validates teacher is available during requested time
- Existing Bookings: Checks for overlapping student lessons
- Block Time Conflicts: Validates against teacher's blocked time periods
- Exception Handling: Excludes current schedule from conflict checking (curStudentPlanId)
```

#### **Room Conflict Detection**
```
Business Logic: GetListConflictRoomFollowing(roomId, startTime, endTime, oldScheduleId, teacherId, scheduleType)
- Room Availability: Ensures room is available for requested time slot
- Recurring Schedule Impact: Checks conflicts for recurring lesson series
- Teacher-Room Assignment: Validates teacher has access to requested room
- Schedule Type Consideration: Different conflict rules for weekly vs one-time lessons
```

#### **Holiday & Block Time Integration**
```
Business Logic: GetValidateScheduleWithHolidayAutoBank(studentScheduleReferenceId)
- Holiday Detection: Automatically identifies lessons falling on holidays
- Auto-Banking: Converts holiday lessons to banked lessons automatically
- Schedule Adjustment: Reschedules recurring lessons around holiday periods
- Business Rule: Protects revenue while respecting holiday policies
```

### 4.2 Recurring Lesson Management

#### **Recurring Schedule Generation**
```
Business Logic: SaveRecuringByType(obj, scheduleTypeId, lessonPackage, userId, sourceType, ...)
Parameters:
- scheduleTypeId: Defines recurrence pattern (weekly, bi-weekly, monthly)
- lessonPackage: Number of lessons in package
- isRecurringPlan: Enables automatic billing integration
- studentPlanHistoryID: Links to payment history for billing
- numberPackagePay/numberMonthlyPay/numberDayPay: Payment frequency options
```

#### **Billing Integration for Recurring Lessons**
```
Business Logic: Recurring Lesson + Payment Integration
1. Schedule Creation: Generate lesson series based on recurrence pattern
2. Payment Plan Setup: Create corresponding payment schedule
3. Billing Date Calculation: Align billing dates with lesson schedule
4. Proration Logic: Handle mid-cycle starts and adjustments
5. Payment Failure Handling: Suspend lessons for failed payments
```

#### **Recurring Schedule Modification**
```
Business Logic: GenerateRecuringByRepeatWeekView(obj, scheduleTypeId, userId, generateNext, ...)
- Dynamic Generation: Creates next set of recurring lessons on demand
- Payment Validation: Ensures payment history supports additional lessons
- Schedule Continuity: Maintains consistent timing and teacher assignment
- Billing Synchronization: Keeps lesson schedule aligned with payment schedule
```

### 4.3 Teacher Availability & Block Time Management

#### **Holiday Block Time Processing**
```
Business Logic: GetHolidayBlockOffTimeByDateTime(teacherId, fromTime, toTime)
- Holiday Detection: Identifies teacher holiday periods
- Block Time Conflicts: Prevents lesson scheduling during blocked periods
- Automatic Rescheduling: Suggests alternative times for conflicted lessons
- Business Rule: Teacher availability takes precedence over student preferences
```

#### **Open Block Time Optimization**
```
Business Logic: Teacher Open Block Time Management
- Flexible Scheduling: TeacherOpenBlockTimeNoEndDateBll supports variable lesson lengths
- Utilization Optimization: Maximizes teacher time utilization
- Back-to-Back Scheduling: Enables efficient consecutive lesson booking
- Break Management: Ensures adequate break time between lessons
```

#### **Conflict Resolution with Block Time**
```
Business Logic: GetListConflickWithBlockTime(teacherSchedule)
- Block Time Validation: Checks new schedules against teacher's blocked time
- Automatic Conflict Resolution: Suggests alternative time slots
- Priority Management: Handles conflicts based on lesson priority and payment status
```

### 4.4 Room & Resource Allocation

#### **Room Assignment Algorithm**
```
Business Logic: GetRoomByTeacherID(teacherId, startTime, endTime, scheduleId, schoolId)
- Teacher-Room Access: Validates teacher has permission to use specific rooms
- Time-Based Availability: Ensures room is available during lesson time
- School Boundary: Restricts room access to appropriate school
- Equipment Matching: Matches room capabilities to lesson requirements
```

#### **Room Availability Optimization**
```
Business Logic: GetRoomAvailable(schoolId, teacherId, startTime, endTime, oldRoomId)
- Real-Time Availability: Provides current room availability status
- Teacher Preferences: Considers teacher's preferred room assignments
- Equipment Requirements: Matches specialized equipment needs
- Conflict Avoidance: Excludes rooms with scheduling conflicts
```

#### **Room Schedule Management**
```
Business Logic: SaveRoomSchedule(obj, userID) and SaveByScheduleID(obj, userID)
- Room Booking: Creates room reservations linked to lesson schedules
- Conflict Prevention: Validates room availability before booking
- Resource Tracking: Maintains comprehensive room utilization records
- Billing Integration: Links room usage to lesson billing
```

### 4.5 Attendance & Cancellation Management

#### **Attendance Tracking Integration**
```
Business Logic: UpdateCancelAttendance(obj, userID, isUpdateAttendace, studentPlanID, groupID)
- Attendance Recording: Links schedule changes to attendance records
- Payment Impact: Adjusts billing based on attendance and cancellations
- Group Lesson Handling: Manages attendance for group lessons separately
- Makeup Lesson Eligibility: Determines makeup lesson qualification based on cancellation timing
```

#### **Cancellation Processing**
```
Business Logic: SaveCancelAttendance(List\<TeacherSchedule\>, userID, isUpdateAttendance, ...)
- Bulk Cancellation: Supports cancelling multiple lessons simultaneously
- Teacher Notification: Automatically notifies teachers of cancellations
- Payment Adjustment: Processes refunds or credits based on cancellation policy
- Rescheduling Options: Provides alternative scheduling options
```

### 4.6 Calendar Integration & Synchronization

#### **Google Calendar Synchronization**
```
Business Logic: UpdateSync2Google(newObj, oldObj, scheduleTypeId, refId, isOnlyThis, ...)
- Bi-Directional Sync: Synchronizes TC schedules with Google Calendar
- Conflict Detection: Identifies and resolves calendar conflicts
- Privacy Management: Respects privacy settings for calendar sharing
- Real-Time Updates: Provides immediate calendar updates for schedule changes
```

#### **Calendar Event Management**
```
Business Logic: Calendar Integration Workflow
1. Event Creation: Automatically creates calendar events for new lessons
2. Update Propagation: Syncs schedule changes to external calendars
3. Deletion Handling: Removes calendar events for cancelled lessons
4. Timezone Conversion: Handles timezone differences for multi-location schools
```

### 4.7 Automated Scheduling Optimization

#### **Recurring Payment Processing**
```
Business Logic: RecurringBll.RecurringPlanDoWork()
- Automated Processing: Background service processes recurring billing
- Queue Management: Manages payment processing queue with throttling
- Error Handling: Implements retry logic for failed payment processing
- Performance Optimization: Limits concurrent processing to prevent system overload
```

#### **Schedule Validation & Data Integrity**
```
Business Logic: CheckDataCurrentWeek(dateLasted, teacherId)
- Data Consistency: Validates schedule data integrity
- Conflict Resolution: Identifies and resolves scheduling inconsistencies
- Performance Monitoring: Tracks scheduling system performance
- Business Intelligence: Provides insights for schedule optimization
```

## 5. User Experience & Scenarios

### 5.1 Busy Parent Scheduling Scenario
**Scenario**: A working parent needs to coordinate music lessons for two children with different teachers while managing their own work schedule.

**Workflow**:
1. Parent accesses family scheduling dashboard showing both children's lesson schedules
2. Books recurring piano lessons for first child on Tuesday afternoons
3. Schedules violin lessons for second child on Thursday evenings
4. Receives calendar integration with work calendar to avoid conflicts
5. Gets automated reminders 24 hours and 1 hour before each lesson
6. Needs to reschedule one lesson due to school event, finds alternative time easily
7. Tracks lesson attendance and progress through integrated scheduling system

**Success Criteria**:
- All lessons scheduled without conflicts with work or school commitments
- Rescheduling completed within 2 minutes with suitable alternative found
- 100% lesson attendance through effective reminder system
- Consolidated view of all family scheduling reduces management overhead

### 5.2 Teacher Workload Optimization Scenario
**Scenario**: A popular piano teacher wants to maximize teaching hours while maintaining work-life balance.

**Workflow**:
1. Teacher sets availability preferences for optimal teaching blocks
2. System suggests schedule optimization to minimize gaps between lessons
3. Recurring student bookings fill most available slots automatically
4. Teacher blocks time for lesson preparation and administrative tasks
5. Substitute teacher arranged for planned vacation with seamless student communication
6. Analytics show 90% utilization rate with optimal income and schedule satisfaction
7. Waitlist management captures additional demand for future scheduling

**Success Criteria**:
- 90% utilization rate achieved while maintaining preferred schedule patterns
- 95% student satisfaction with lesson consistency and quality
- Seamless vacation coverage with minimal student disruption
- 20% increase in teaching income through optimized scheduling

### 5.3 Music School Resource Management Scenario
**Scenario**: A music school needs to optimize room and equipment usage across 50 teachers and 300 students.

**Workflow**:
1. Administrator monitors real-time resource utilization dashboard
2. Identifies underutilized practice rooms during peak hours
3. Implements dynamic pricing to encourage off-peak bookings
4. Coordinates equipment maintenance during low-usage periods
5. Manages room assignments for group classes and recitals
6. Tracks utilization metrics and identifies expansion opportunities
7. Optimizes teacher schedules to maximize room efficiency

**Success Criteria**:
- 85% average room utilization during business hours
- Zero scheduling conflicts through automated conflict resolution
- 15% increase in lesson capacity without additional facility investment
- 95% teacher and student satisfaction with resource availability

---

**Document Status**: ✅ COMPREHENSIVE - Complete business requirements defined
**Last Updated**: 2025-07-21
**Version**: 1.0