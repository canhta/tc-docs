# Payroll & Teacher Compensation PRD

## Business Overview

The Payroll & Teacher Compensation module serves as the financial backbone of the TC platform, ensuring accurate, timely, and compliant teacher compensation based on attendance-driven performance metrics. This system directly impacts teacher satisfaction, retention, and business operational efficiency by automating complex payroll calculations while maintaining regulatory compliance.

### Business Value Proposition

- **Teacher Satisfaction**: Accurate and timely compensation builds trust and reduces turnover
- **Operational Efficiency**: Automated payroll processing reduces administrative costs by 80%
- **Financial Accuracy**: Attendance-based calculations ensure fair compensation aligned with actual teaching performance
- **Compliance Assurance**: Built-in regulatory compliance prevents costly legal issues and penalties
- **Business Intelligence**: Comprehensive reporting enables data-driven compensation decisions

### Key Business Metrics

- **Processing Efficiency**: 80% reduction in payroll processing time through automation
- **Accuracy Rate**: 99.9% calculation accuracy with automated validation and approval workflows
- **Teacher Retention**: Improved retention rates through reliable and transparent compensation
- **Compliance Score**: 100% regulatory compliance with automated documentation and audit trails

## User Roles & Permissions

_For complete role definitions and hierarchy, see [User Management & Authentication PRD](./user-management-authentication)_

### Primary Actors

#### Teachers (Role Level 200)

**Business Justification**: Teachers need visibility into their compensation to plan finances and verify payment accuracy

- **View Payroll Information**: Access personal payroll summaries and payment history
- **Review Wage Rates**: View configured compensation rates and calculation methods
- **Track Attendance Impact**: Monitor how attendance affects compensation calculations
- **Access Payment Details**: Review detailed breakdown of lesson-level compensation

#### School Administrators (Role Level 300)

**Business Justification**: School administrators manage teacher compensation to ensure fair pay and operational efficiency

- **Manage Payroll Periods**: Create, configure, and process payroll periods for their school
- **Configure Teacher Wages**: Set and modify teacher compensation rates and structures
- **Process Payroll Approvals**: Review and approve payroll calculations before payment
- **Generate Payroll Reports**: Access comprehensive payroll analytics and summaries
- **Handle Payroll Corrections**: Manage payroll adjustments and error corrections

#### SubAdmins (Role Level 250)

**Business Justification**: SubAdmins provide operational support while maintaining appropriate access controls

- **Limited Payroll Administration**: Assist with payroll processing under administrator oversight
- **View Payroll Reports**: Access payroll summaries for operational support
- **Support Teacher Inquiries**: Help teachers understand payroll calculations and payments

#### System Administrators (Role Level 500)

**Business Justification**: System administrators ensure platform-wide payroll integrity and compliance

- **System-Wide Payroll Oversight**: Monitor payroll processing across all schools
- **Manage Payroll Configuration**: Configure system-wide payroll settings and compliance rules
- **Handle Complex Issues**: Resolve technical payroll problems and system integrations
- **Audit Trail Management**: Access comprehensive audit logs for compliance and troubleshooting

## Core Business Features

### 1. Payroll Period Management - Financial Operations Engine

**Business Purpose**: Ensure consistent, accurate, and timely teacher compensation that supports business stability and teacher satisfaction

#### Key Business Capabilities

##### Automated Payroll Period Creation

**Business Logic**: Streamlined period creation reduces administrative overhead and ensures consistent processing schedules

- **Date Range Configuration**: Flexible payroll periods (weekly, bi-weekly, monthly) aligned with business needs
- **Teacher Selection Logic**: Intelligent teacher filtering based on employment status and eligibility criteria
- **Attendance Type Integration**: Configurable attendance types determine compensation eligibility
- **Multi-School Processing**: Centralized payroll management across multiple school locations

##### Payroll Status Management Workflow

**Business Value**: Structured approval process ensures accuracy and maintains financial controls

1. **Draft Status**: Initial payroll creation allows for review and modifications
2. **Waiting Confirmation (Status 6)**: Payroll calculations completed, pending administrative approval
3. **Active Status (Status 1)**: Approved payroll ready for payment processing
4. **Deleted Status (Status 3)**: Cancelled payroll with complete audit trail

##### Timezone-Aware Processing

**Business Logic**: Accurate date handling ensures proper lesson inclusion and fair compensation

- **UTC Conversion**: All payroll dates converted to UTC for consistent processing
- **Local Time Display**: User interfaces show local times for intuitive date selection
- **Cross-Timezone Support**: Multi-location schools with different timezone requirements

## 3. Business Workflows & Compensation Orchestration

### 3.1 Comprehensive Payroll Period Management & Processing Engine

#### **Payroll Period Generation & Teacher Allocation**

```
Business Logic: GeneratePayrollPeriod(schoolId, fromDate, toDate, teacherList, attendanceTypes)

Payroll Period Orchestration:
1. Period Definition: Creates structured payroll periods with date boundaries and teacher assignments
2. Teacher Eligibility: Validates teacher eligibility and wage rate configurations
3. Attendance Type Integration: Links payroll periods to specific attendance tracking categories
4. Timezone Management: Handles multi-timezone payroll processing for distributed schools
5. Audit Trail Creation: Establishes comprehensive tracking for payroll period lifecycle

Payroll Generation Algorithm:
PayrollPeriod payrollPeriod = {
    SchoolID: schoolId,
    FromDate: fromDate,
    ToDate: toDate,
    Status: "Pending",
    CreatedDate: DateTime.UtcNow,
    TeacherList: ValidateTeacherEligibility(teacherList),
    AttendanceTypes: attendanceTypes
}

Teacher Validation Process:
FOR EACH teacher IN teacherList DO
    teacherWage = GetTeacherWageConfiguration(teacher.TeacherID)
    IF (teacherWage == NULL) THEN
        AddToMissingWageList(teacher)
        LogPayrollWarning("Teacher missing wage configuration", teacher.TeacherID)
    ELSE
        ValidateWageConfiguration(teacherWage)
        AddToEligibleTeachers(teacher, teacherWage)
    END IF
END FOR

Business Integration Points:
- Scheduling System: Links to lesson attendance data for compensation calculation
- Billing System: Coordinates with student billing for revenue-based compensation
- Payment Processing: Integrates with payment systems for automated teacher payments
- Reporting System: Provides comprehensive payroll analytics and compliance reporting
```

#### **Teacher Wage Configuration & Rate Management**

```
Business Logic: Save(TeacherPayrollWage obj, long userID) - Wage Configuration

Wage Configuration Framework:
1. Multi-Model Support: Handles hourly, per-lesson, and percentage-based compensation models
2. XML Serialization: Stores complex wage structures with detailed configuration parameters
3. Rate Validation: Ensures wage rates comply with business rules and legal requirements
4. Historical Tracking: Maintains wage rate history for audit and compliance purposes
5. Integration Validation: Verifies wage configuration compatibility with payroll processing

Wage Rate Types and Business Logic:
IF (obj.RateType == RateType.Hourly) THEN
    ValidateHourlyRate(obj.HourlyRate, minimumWage, maximumWage)
    ConfigureOvertimeRules(obj.OvertimeMultiplier)
    SetupTimeTracking(obj.TeacherID, "Hourly")
ELSE IF (obj.RateType == RateType.PerLesson) THEN
    ValidateLessonRate(obj.LessonRate, minimumLessonRate, maximumLessonRate)
    ConfigureLessonTypeRates(obj.LessonTypeRates)
    SetupLessonTracking(obj.TeacherID, "PerLesson")
ELSE IF (obj.RateType == RateType.Percentage) THEN
    ValidatePercentageRate(obj.PercentageRate, 0.0, 1.0)
    ConfigureRevenueSharing(obj.RevenueShareRules)
    SetupRevenueTracking(obj.TeacherID, "Percentage")
END IF

Teacher Wage Validation:
GetTeacherNotHaveRateWage(listTeacherId):
- Identifies teachers without configured wage rates
- Prevents payroll processing errors due to missing compensation data
- Triggers administrative alerts for wage configuration completion
- Maintains payroll processing integrity and compliance
```

#### Business Use Cases

##### Monthly Payroll Processing Workflow

1. **Period Preparation**: Administrator defines payroll date range and selects eligible teachers
2. **Attendance Compilation**: System automatically collects lesson attendance data from scheduling system
3. **Calculation Processing**: Automated compensation calculations based on attendance and configured wage rates
4. **Review & Validation**: Administrator reviews calculated amounts for accuracy and completeness
5. **Approval Process**: Authorized personnel approve payroll for payment processing
6. **Payment Execution**: Integration with payment systems for automated teacher compensation

**Business Value**: Streamlined processing reduces administrative costs and ensures timely teacher compensation

### 3.2 Group Lesson Rate Management & Multi-Teacher Coordination

#### **Group Rate Orchestration & Revenue Distribution**

```
Business Logic: SaveMulti(List\<TeacherGroupRate\> obj, long userID, Guid xrefId)

Group Rate Orchestration:
1. Multi-Teacher Coordination: Manages compensation for multiple teachers in group lessons
2. Rate Distribution: Allocates group lesson revenue among participating teachers
3. Substitute Teacher Integration: Handles substitute teacher rates and compensation
4. Cross-Reference Tracking: Maintains relationships between group rates and lesson instances
5. Audit Trail Management: Comprehensive tracking of group rate changes and applications

Group Rate Calculation Framework:
FOR EACH teacherGroupRate IN groupRateList DO
    ValidateTeacherEligibility(teacherGroupRate.TeacherID, groupId)
    CalculateGroupRateShare(teacherGroupRate, totalGroupRevenue)
    ApplySubstituteRules(teacherGroupRate, xrefSubstituteID)
    UpdateRateHistory(teacherGroupRate, xrefId)
END FOR

Group Rate Business Rules:
Get(groupId, xrefId, xrefSubstituteID):
- Retrieves group-specific rates for teachers and substitutes
- Handles complex rate structures for ensemble and group lessons
- Manages rate variations based on group size and lesson complexity
- Supports dynamic rate adjustments based on attendance and performance

Multi-Teacher Compensation Logic:
IF (GroupLesson.TeacherCount > 1) THEN
    totalCompensation = CalculateGroupLessonRevenue(groupId)
    FOR EACH teacher IN GroupLesson.Teachers DO
        teacherShare = CalculateTeacherShare(teacher, totalCompensation)
        ApplyPerformanceAdjustments(teacher, teacherShare)
        RecordCompensation(teacher.TeacherID, teacherShare, xrefId)
    END FOR
END IF
```

#### **Teacher Payment Processing & Distribution Management**

```
Business Logic: GetByStudentId(studentId) - Teacher Payment Tracking Integration

Teacher Payment Orchestration:
1. Student-Teacher Relationship Mapping: Links student payments to teacher compensation
2. Payment Method Management: Handles teacher payment preferences and distribution methods
3. Multi-School Coordination: Manages teachers working across multiple schools
4. Payment Verification: Ensures accurate payment distribution and tracking
5. Compliance Reporting: Maintains comprehensive records for tax and audit purposes

Payment Distribution Algorithm:
GetByStudentId(studentId):
teacherPaymentList = []
FOR EACH lesson IN GetStudentLessons(studentId) DO
    teacher = GetLessonTeacher(lesson.LessonID)
    paymentAmount = CalculateTeacherPayment(lesson, teacher.CompensationModel)
    teacherPayment = {
        TeacherID: teacher.TeacherID,
        StudentID: studentId,
        LessonID: lesson.LessonID,
        PaymentAmount: paymentAmount,
        PaymentDate: lesson.LessonDate,
        CompensationModel: teacher.CompensationModel
    }
    teacherPaymentList.Add(teacherPayment)
END FOR

Business Integration Points:
- Student Billing System: Coordinates teacher payments with student billing cycles
- Attendance Tracking: Links teacher compensation to actual lesson delivery
- Tax Reporting: Generates necessary tax documentation for teacher payments
- Performance Analytics: Tracks teacher earnings and performance correlations
```

### 3.3 Attendance-Based Compensation & Performance Integration

#### **Attendance Type Management & Compensation Rules**

```
Business Logic: PayrollPeriodAttendanceType Management

Attendance-Based Compensation Framework:
1. Attendance Type Configuration: Defines compensation rules for different attendance scenarios
2. Performance Integration: Links attendance patterns to compensation adjustments
3. Policy Enforcement: Ensures consistent application of attendance-based payment rules
4. Exception Handling: Manages special cases and administrative overrides
5. Reporting Integration: Provides detailed attendance-compensation analytics

Attendance Compensation Matrix:
Save(PayrollPeriodAttendanceType obj, long userID):

IF (obj.AttendanceType == "Attended") THEN
    CompensationRate = 1.0 (Full compensation)
    PerformanceBonus = CalculatePerformanceBonus(teacherID, attendanceHistory)
ELSE IF (obj.AttendanceType == "TeacherCancel") THEN
    CompensationRate = 0.3 (Partial compensation for preparation time)
    PenaltyApplied = FALSE
ELSE IF (obj.AttendanceType == "StudentNoShow") THEN
    CompensationRate = 0.5 (Compensation for availability)
    AttendanceCredit = TRUE
ELSE IF (obj.AttendanceType == "Excused") THEN
    CompensationRate = 0.8 (Reduced compensation for excused absence)
    MakeUpOpportunity = TRUE
END IF

Business Rules Application:
- Consistent Policy Enforcement: Ensures fair and transparent compensation across all teachers
- Performance Correlation: Links attendance patterns to teacher performance evaluations
- Financial Planning: Provides predictable compensation models for budget planning
- Quality Assurance: Maintains educational standards through attendance-based incentives
```

### 4. Teacher Compensation Calculation Engine

**Business Purpose**: Provide flexible, accurate, and transparent compensation models that align teacher pay with performance and business objectives

#### Compensation Models

##### Hourly Rate Compensation (Rate Type 2)

**Business Logic**: Time-based compensation ensures teachers are paid for actual teaching hours

- **Calculation Formula**: `TotalHours * HourlyRate`
- **Hour Tracking**: Precise lesson duration calculation using start/end times
- **Overtime Handling**: Configurable overtime rates for extended teaching periods
- **Business Value**: Fair compensation for variable teaching schedules and substitute coverage

##### Per-Lesson Rate Compensation (Rate Type 1)

**Business Logic**: Lesson-based pay provides predictable compensation and simplifies scheduling

- **Base Calculation**: `LessonCount * LessonRate`
- **Length Adjustment**: Prorated compensation for non-standard lesson lengths
- **Formula**: `(LessonCount * Rate) * (ActualLength / StandardLength)`
- **Business Value**: Predictable teacher income and simplified payroll calculations

##### Percentage-Based Compensation (Rate Type 3)

**Business Logic**: Revenue-sharing model aligns teacher compensation with business performance

- **Calculation**: `SUM(LessonRevenue * TeacherPercentage)`
- **Revenue Integration**: Direct connection to student billing amounts
- **Transaction Fee Handling**: Compensation based on net revenue after fees
- **Business Value**: Performance-based pay that scales with business success

#### Attendance-Based Payment Rules

##### Attendance Type Compensation Matrix

**Business Logic**: Different attendance scenarios require different compensation approaches to balance fairness and business sustainability

- **Attended Lessons (Type 1)**: Full compensation - teacher delivered service as scheduled
- **Teacher Cancellation (Type 2)**: Partial compensation based on cancellation policy - maintains teacher income stability
- **Student Cancellation (Type 3)**: Compensation based on notice period - balances teacher protection with business costs
- **No Show (Type 4)**: Configurable compensation - protects teacher time while managing business risk
- **Banked Lessons (Type 5)**: Full compensation - teacher delivered service, payment deferred for student
- **Banked Teacher Cancel (Type 51)**: Policy-based compensation for banked lesson cancellations
- **Banked Student Cancel (Type 52)**: Compensation rules for student-cancelled banked lessons

### 3. Payroll Summary & Reporting System

**Business Purpose**: Provide comprehensive visibility into compensation calculations and enable data-driven payroll decisions

#### Summary Generation Logic

**Business Value**: Automated summaries reduce manual work and provide consistent reporting

##### Teacher-Level Summaries

- **Total Lessons**: Count of compensable lessons by attendance type
- **Total Hours**: Sum of teaching hours for hourly-rate teachers
- **Gross Compensation**: Total calculated pay before deductions
- **Tax Calculations**: Automated tax withholding based on employment classification
- **Net Payment**: Final payment amount after all deductions

##### Detailed Breakdown Reports

- **Lesson-Level Details**: Individual lesson compensation with attendance type and rate applied
- **Attendance Type Analysis**: Compensation breakdown by different attendance scenarios
- **Rate Type Distribution**: Analysis of compensation across different rate structures
- **Period Comparisons**: Historical compensation trends and variations

#### Business Intelligence Features

- **Teacher Performance Metrics**: Attendance rates, lesson completion, and compensation trends
- **Cost Analysis**: Payroll costs as percentage of revenue by teacher and school
- **Compliance Reporting**: Automated generation of tax documents and regulatory reports
- **Forecasting**: Predictive payroll costs based on scheduling and historical patterns

## Business Workflows

### 1. Payroll Period Creation & Processing

#### Workflow Steps

1. **Period Definition**
   - Administrator selects payroll start and end dates
   - System validates date ranges and checks for overlapping periods
   - Timezone conversion ensures accurate lesson inclusion

2. **Teacher & Attendance Selection**
   - Administrator selects eligible teachers from active roster
   - System identifies teachers without configured wage rates
   - Attendance types selected determine compensation eligibility

3. **Automated Calculation Processing**
   - System collects lesson attendance data from scheduling system
   - Wage rates applied based on teacher configuration and rate type
   - Compensation calculated using appropriate formula for each rate type
   - Summary and detail records generated for review

4. **Review & Approval Workflow**
   - Administrator reviews calculated amounts and attendance data
   - System provides detailed breakdown for verification
   - Approval changes status from "Waiting Confirmation" to "Active"
   - Audit trail maintained for all changes and approvals

5. **Payment Processing Integration**
   - Approved payroll data exported to payment systems
   - Teachers notified of payment processing
   - Payment confirmation tracked and recorded

### 2. Teacher Wage Configuration Workflow

#### Wage Setup Process

1. **Teacher Onboarding**
   - New teacher wage rates configured during setup
   - Rate type selected based on teaching arrangement
   - Validation ensures all active teachers have wage configurations

2. **Rate Modification Process**
   - Administrator updates teacher wage rates
   - System validates rate changes and effective dates
   - Historical rate tracking maintains audit trail
   - Teachers notified of compensation changes

3. **Bulk Rate Updates**
   - System supports bulk wage rate adjustments
   - Percentage-based increases for annual adjustments
   - Validation prevents accidental rate reductions
   - Approval workflow for significant rate changes

## Business Rules & Policies

### Compensation Policies

#### Attendance-Based Payment Rules

- **Full Compensation**: Teachers receive full pay for attended lessons and completed teaching obligations
- **Cancellation Compensation**: Teachers receive partial compensation for cancellations based on notice period and school policy
- **No-Show Protection**: Teachers protected from student no-shows with configurable compensation rates
- **Banked Lesson Handling**: Teachers compensated for delivered lessons regardless of student banking status

#### Wage Rate Management

- **Regular Rate Reviews**: Systematic wage rate evaluations to maintain market competitiveness
- **Performance-Based Increases**: Compensation adjustments based on teaching performance and student outcomes
- **Transparent Communication**: Clear communication of wage rates and calculation methods to teachers
- **Market Rate Analysis**: Regular comparison with industry standards to ensure competitive compensation

### Payroll Processing Rules

#### Processing Schedule

- **Consistent Timing**: Regular payroll processing schedule communicated to all teachers
- **Holiday Adjustments**: Payroll processing adjusted for holidays and weekends
- **Emergency Processing**: Capability for urgent payroll corrections and special payments
- **Advance Notice**: Teachers notified of payroll processing dates and payment schedules

#### Validation & Approval

- **Dual Approval**: Significant payroll amounts require multiple approvals
- **Calculation Verification**: Automated validation of compensation calculations
- **Exception Handling**: Special procedures for unusual attendance or compensation scenarios
- **Error Correction**: Systematic process for identifying and correcting payroll errors

## Integration Points

### Scheduling System Integration

- **Attendance Data Source**: Real-time lesson attendance tracking from scheduling system
- **Teacher Availability**: Integration with teacher scheduling for accurate hour calculations
- **Lesson Modifications**: Automatic updates when lessons are rescheduled or modified
- **Cancellation Processing**: Seamless handling of lesson cancellations and their compensation impact

### Billing System Integration

- **Revenue Sharing**: Direct connection to student billing for percentage-based compensation
- **Transaction Fees**: Accurate calculation of net revenue for teacher compensation
- **Payment Status**: Integration with payment processing to ensure accurate revenue calculations
- **Refund Handling**: Compensation adjustments when student refunds are processed

### User Management Integration

- **Teacher Status**: Automatic updates when teacher employment status changes
- **Role-Based Access**: Compensation visibility based on user roles and permissions
- **Multi-School Support**: Teacher compensation across multiple school locations
- **Audit Trail**: Complete tracking of who makes payroll changes and when

## Compliance & Reporting

### Tax Compliance

- **Employment Classification**: Proper handling of employee vs. contractor compensation
- **Tax Document Generation**: Automated 1099 and W-2 form generation
- **Withholding Calculations**: Accurate tax withholding based on employment status
- **Year-End Reporting**: Comprehensive tax reporting for regulatory compliance

### Audit & Documentation

- **Complete Audit Trail**: Every payroll change tracked with user, timestamp, and reason
- **Document Retention**: Payroll records maintained according to legal requirements
- **Compliance Monitoring**: Regular validation of payroll practices against regulations
- **External Audit Support**: Comprehensive documentation for external audits

---

**Document Status**: ✅ COMPLETE - Comprehensive business requirements documented  
**Last Updated**: 2025-07-22  
**Target Audience**: Product Owners, Business Analysts, School Administrators  
**Business Impact**: Critical - Teacher compensation directly affects satisfaction, retention, and operational efficiency
