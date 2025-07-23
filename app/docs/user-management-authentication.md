# User Management & Authentication PRD

## 1. Business Overview

### Business Purpose

The User Management & Authentication system serves as the foundational security and access control layer for the TC music education platform. It manages the complete lifecycle of all stakeholders in the music education ecosystem, from initial registration through ongoing engagement and eventual account closure.

### Value Proposition

- **Centralized Identity Management**: Single source of truth for all user identities and relationships
- **Role-Based Security**: Granular access control ensuring users see only relevant information
- **Streamlined Operations**: Automated user workflows reducing administrative overhead
- **Enhanced User Experience**: Seamless authentication and personalized access based on user roles
- **Compliance & Audit**: Comprehensive activity logging for regulatory compliance and security monitoring

### Business Impact

- **Operational Efficiency**: 75% reduction in manual user management tasks through automated workflows
- **Security Enhancement**: Zero-trust architecture with role-based access controls and multi-factor authentication
- **User Satisfaction**: Simplified registration and authentication processes with social media integration
- **Compliance Assurance**: Complete audit trails for regulatory requirements (PCI DSS, COPPA, GDPR)
- **Scalability Support**: Multi-tenant architecture supporting unlimited schools and users
- **Revenue Protection**: Secure access controls protect paid content and premium features
- **Family Management**: Consolidated billing and management for multiple children increases customer lifetime value

### Key Stakeholders

- **Students**: End users receiving music education services
- **Parents**: Guardians managing student accounts and educational progress
- **Teachers**: Music instructors providing educational services
- **School Administrators**: Business owners managing educational operations
- **System Administrators**: Technical staff maintaining platform operations
- **Payment Processors**: Automated systems handling financial transactions

## 2. User Roles & Permissions

### 2.1 Student (Security Level 100)

**Business Purpose**: End users receiving music education services and engaging with learning content.

**Core Responsibilities**:

- Attend scheduled lessons and complete assignments
- Engage with educational content and practice materials
- Communicate with teachers and school administrators
- Manage personal learning preferences and progress tracking

**Business Access Rights**:

- **Personal Data**: Full access to own profile, preferences, and learning history
- **Educational Content**: Access to assigned courses, lessons, and practice materials
- **Scheduling**: View and manage own lesson schedules and availability
- **Communication**: Direct messaging with assigned teachers and school staff
- **Progress Tracking**: View personal progress reports and achievement metrics
- **Payment Information**: View billing history and payment methods (with parent oversight for minors)

**Business Justification**: Students require access to their educational materials and progress while maintaining privacy and age-appropriate restrictions. Students are core revenue generators who consume educational content and services, requiring access to their educational content while being restricted from administrative functions that could disrupt school operations.

**Business Rules**:

- Required fields ensure minimum data quality for effective operations
- Contact information updates trigger verification workflows
- Skill level assessments must be validated by qualified teachers
- Session timeout: 24 hours for optimal user experience
- Account lockout protection prevents unauthorized access to paid content

### 2.2 Teacher (Security Level 200)

**Business Purpose**: Music instructors providing educational services and managing student progress.

**Core Responsibilities**:

- Deliver music lessons and create educational content
- Track student progress and provide feedback
- Manage lesson schedules and availability
- Communicate with students, parents, and school administrators

**Business Access Rights**:

- **Student Management**: Access to assigned students' profiles, progress, and educational history
- **Content Creation**: Create and manage courses, lessons, and assignments
- **Scheduling Management**: Set availability, manage lesson schedules, and handle cancellations
- **Communication**: Direct messaging with students, parents, and school administrators
- **Reporting**: Generate student progress reports and attendance tracking
- **Payment Visibility**: View lesson-related payment information for compensation tracking

**Business Justification**: Teachers are primary service delivery personnel who generate revenue through instruction. They need comprehensive access to student information to provide effective instruction while maintaining professional boundaries and being restricted from school-wide administrative functions.

**Business Rules**:

- Teacher onboarding requires credential verification and approval workflow
- Access to student contact information limited to educational purposes only
- Compensation and payroll information access restricted to own data
- Session timeout: 12 hours for security balance
- Performance monitoring through student feedback and retention metrics

### 2.3 SubAdmin (Security Level 250)

**Business Purpose**: Limited administrative support staff with specific operational responsibilities.

**Core Responsibilities**:

- Assist with day-to-day administrative tasks
- Support customer service and user management
- Handle routine operational workflows
- Provide first-level technical support

**Business Access Rights**:

- **Limited User Management**: Create and modify student and teacher accounts within assigned schools
- **Scheduling Support**: Assist with lesson scheduling and calendar management
- **Communication Management**: Handle customer service communications and notifications
- **Basic Reporting**: Access to operational reports and basic analytics
- **Content Support**: Assist with course and lesson management tasks

**Business Justification**: SubAdmins require operational access to support business functions while maintaining appropriate security boundaries.

### 2.4 School Administrator (Security Level 300)

**Business Purpose**: Business owners and managers responsible for complete school operations and strategic decision-making.

**Core Responsibilities**:

- Manage all aspects of school operations and business strategy
- Oversee teacher recruitment, training, and performance management
- Monitor student enrollment, retention, and satisfaction
- Handle financial management and business analytics

**Business Access Rights**:

- **Complete School Management**: Full access to all school-related data, users, and operations
- **Teacher Management**: Recruit, onboard, evaluate, and manage teacher performance
- **Student Oversight**: Monitor student progress, engagement, and satisfaction across all programs
- **Financial Control**: Access to all payment, billing, and financial reporting data
- **Business Analytics**: Comprehensive reporting and analytics for strategic decision-making
- **System Configuration**: Customize school-specific settings, branding, and operational parameters

**Business Justification**: School administrators require comprehensive access to manage their business operations effectively and make informed strategic decisions.

### 2.5 Admin (Security Level 400)

**Business Purpose**: System-wide administrators responsible for platform operations and multi-school management.

**Core Responsibilities**:

- Manage platform-wide operations and system health
- Oversee multiple schools and resolve cross-school issues
- Handle technical support and system configuration
- Ensure platform compliance and security standards

**Business Access Rights**:

- **Multi-School Management**: Access to all schools and their operational data
- **User Management**: Create and manage all user types across the platform
- **System Configuration**: Configure platform-wide settings and integrations
- **Analytics**: Access to platform-wide reporting and business intelligence
- **Security Management**: Monitor security events and manage access controls
- **Integration Management**: Configure and manage third-party integrations

**Business Justification**: Platform administrators require broad access to maintain system operations and support multiple schools effectively.

### 2.6 Super Admin (Security Level 500)

**Business Purpose**: Ultimate system authority with complete platform control and emergency access capabilities.

**Core Responsibilities**:

- Maintain ultimate system security and integrity
- Handle emergency situations and critical system issues
- Manage platform architecture and strategic technical decisions
- Oversee compliance with regulatory and security requirements

**Business Access Rights**:

- **Complete System Control**: Unrestricted access to all platform functions and data
- **Emergency Override**: Ability to override any security restriction in emergency situations
- **System Architecture**: Modify core system configurations and security policies
- **Audit and Compliance**: Access to all audit logs and compliance reporting
- **Strategic Analytics**: Complete visibility into platform performance and business metrics

**Business Justification**: Super administrators require ultimate access to ensure platform security, handle emergencies, and maintain system integrity.

### 2.7 PrecisePay (Security Level 600)

**Business Purpose**: Automated payment processing system integration with specific financial data access requirements.

**Core Responsibilities**:

- Process payment transactions and updates
- Maintain payment method and billing information
- Generate payment-related notifications and reports
- Ensure PCI compliance for financial data handling

**Business Access Rights**:

- **Payment Processing**: Access to payment methods, billing information, and transaction data
- **Financial Reporting**: Generate payment-related reports and analytics
- **Notification Management**: Send payment confirmations, failures, and reminders
- **Compliance Monitoring**: Access to audit trails for financial compliance requirements

**Business Justification**: Payment processing requires specific access to financial data while being restricted from educational content and user management functions.

## 3. Business Workflows & User Lifecycle Management

### 3.1 Comprehensive User Registration & Onboarding Orchestration

#### **Multi-Stage Registration Workflow**

```
Business Logic: Registration with SMS Verification and Validation

Stage 1 - Initial Registration Data Collection:
Save(Register obj):
1. SMS Verification Setup: Automatic SMS verification based on system configuration
   IF (!String.IsNullOrEmpty(obj.CellPhone) AND SMS_MOD_VERIFY == 0) THEN
       obj.VerifySMS = 1 (Auto-verify SMS when verification is disabled)
   END IF
2. Data Validation: Comprehensive validation of all registration fields
3. Duplicate Prevention: Username and email uniqueness validation
4. Initial Record Creation: Creates preliminary registration record

Stage 2 - Payment Integration (if required):
PaymentSave(Register obj, long memberId, int isNotRequired, long paymentHistoryId):
- Payment Method Validation: Validates payment information if required
- Payment Processing: Processes initial payment or setup fee
- Account Activation: Links payment to user account for activation
- Billing Setup: Establishes recurring billing if applicable

Stage 3 - Account Finalization:
1. Member Record Creation: Converts registration to full member account
2. Role Assignment: Assigns appropriate role based on registration type
3. Permission Setup: Establishes role-based permissions and access rights
4. Welcome Communication: Triggers welcome emails and onboarding materials
```

#### **Family Registration Business Logic**

```
Business Logic: SaveListMember(List\<Member\> Listobj, long userID) - Batch Family Processing

Family Registration Orchestration:
1. Batch Validation: Validates all family members simultaneously
2. SMS Verification Setup: Applies SMS verification rules to all members
3. Relationship Establishment: Creates parent-child relationships and permissions
4. Promotional Pricing: Applies family discounts and promotional rates
5. Unified Billing: Establishes family billing structure and payment responsibility

Family Business Rules:
FOR EACH member IN familyMembers DO
    IF (!String.IsNullOrEmpty(member.CellPhone) AND smsVerify == 0) THEN
        member.VerifySMS = 1
    END IF
    IF (member.PromoPercentage == NULL) THEN
        member.PromoPercentage = 0
    END IF
    EstablishFamilyRelationships(member, familyHead)
    ApplyFamilyDiscounts(member, familyPlan)
END FOR

Username Uniqueness Validation:
FOR EACH username IN proposedUsernames DO
    existingUser = GetByUserName(username)
    IF (existingUser != NULL AND existingUser.MemberID > 0) THEN
        THROW ValidationException("Username '" + username + "' has been used!")
    END IF
END FOR
```

### 3.2 Authentication & Security Workflows

#### **Multi-Factor Authentication & Password Management**

```
Business Logic: Comprehensive Security and Password Management

Password Security Framework:
ResetPassword(long userId, string password):
- Password Encryption: Uses MD5 encryption for password storage (Md5Util.Md5EnCrypt)
- Security Validation: Ensures password meets complexity requirements
- Audit Logging: Records password reset events for security monitoring
- Session Invalidation: Invalidates existing sessions upon password reset

ChangePassword(long memberId, string curPassword, string password):
- Current Password Verification: Validates existing password before change
- Password History: Prevents reuse of recent passwords
- Encryption Consistency: Maintains consistent encryption across password changes
- Security Notifications: Notifies user of successful password changes

Password Policy Enforcement:
1. Minimum Length: 8 characters minimum requirement
2. Complexity Requirements: Mix of uppercase, lowercase, numbers, and symbols
3. Password History: Prevents reuse of last 5 passwords
4. Expiration Policy: Periodic password change requirements for sensitive roles
5. Account Lockout: Temporary lockout after multiple failed attempts
```

#### **Role-Based Authentication & Permission Validation**

```
Business Logic: Hierarchical Permission System with Role-Based Access Control

Permission Validation Matrix:
CheckPermission(Member curUser, Member viewMember):

Admin/SuperAdmin Access (Highest Level):
IF (curUser.IsInRole(RoleGroup.Admin) OR curUser.IsInRole(RoleGroup.AdminSuper)) THEN
    RETURN TRUE (Full system access)
END IF

School Owner Access (Institutional Level):
IF (curUser.IsInRole(RoleGroup.School)) THEN
    IF (viewMember.SchoolOwnerID == curUser.MemberID) THEN
        RETURN TRUE (Access to own school members)
    ELSE IF (viewMember.IsInRole(RoleGroup.Student)) THEN
        IF (viewMember.IsParent) THEN
            schools = GetAllSchoolByParentId(viewMember.MemberID)
            IF (schools.Contains(curUser.MemberID)) THEN
                RETURN TRUE (Access to parent of school students)
            END IF
        ELSE
            schools = GetListSchoolByStudentID(viewMember.MemberID)
            IF (schools.Contains(curUser.MemberID)) THEN
                RETURN TRUE (Access to school students)
            END IF
        END IF
    END IF
END IF

Teacher Access (Limited Scope):
IF (curUser.IsInRole(RoleGroup.Teacher)) THEN
    RETURN CheckTeacherStudentRelationship(curUser.MemberID, viewMember.MemberID)
END IF

RETURN FALSE (Default deny access)
```

#### **Social Authentication Integration**

```
Business Logic: LoginForSchool(long schoolId, MemberOpenIdType openIdType, string token)

Social Login Orchestration:
1. School Validation: Validates school exists and is active
2. Configuration Check: Ensures school has configured social login settings
3. Provider-Specific Processing: Handles Google, Apple, and other OAuth providers
4. Token Validation: Validates OAuth tokens with external providers
5. Account Linking: Links social accounts to existing TC accounts
6. Permission Inheritance: Applies school-specific permissions to social login users

Social Login Decision Matrix:
SWITCH (openIdType)
    CASE Google:
        result = LoginForSchoolViaGoogle(school, config, token)
        BREAK
    CASE Apple:
        result = LoginForSchoolViaApple(school, config, token)
        BREAK
    DEFAULT:
        THROW Exception("OpenIdType invalid")
END SWITCH

IF (result != NULL) THEN
    result.Info.OpenIdType = openIdType
    EstablishSessionContext(result)
    ApplySchoolPermissions(result, school)
END IF
```

#### Student Registration Workflow

1. **Initial Registration**:
   - Student or parent provides basic information (name, email, phone)
   - System validates email uniqueness and format
   - Account created with temporary password
   - Email verification sent with activation link

2. **Profile Completion**:
   - User completes detailed profile information
   - Selects musical interests, instruments, and skill level
   - Agrees to terms of service and privacy policy
   - System assigns appropriate permissions and access levels

3. **School Association**:
   - Student selects or is assigned to a music school
   - School administrator approves enrollment
   - Student gains access to school-specific content and teachers
   - Parent notification sent for minor students

4. **Onboarding Experience**:
   - Guided tour of platform features and capabilities
   - Introduction to assigned teachers and available courses
   - Setup of learning preferences and notification settings
   - Initial assessment or placement evaluation

#### Teacher Registration Workflow

1. **Professional Registration**:
   - Teacher provides professional credentials and experience
   - System validates teaching qualifications and background
   - Account created with enhanced security requirements
   - Professional verification process initiated

2. **School Partnership**:
   - Teacher applies to or is invited by music schools
   - School administrators review teacher qualifications
   - Partnership agreements and compensation terms established
   - Access granted to school-specific resources and students

3. **Content Setup**:
   - Teacher creates professional profile and teaching philosophy
   - Sets up course offerings and lesson availability
   - Configures teaching preferences and communication settings
   - Initial content creation and curriculum development

### 3.2 Authentication Processes

#### Standard Authentication

1. **Login Process**:
   - User enters username/email and password
   - System validates credentials against encrypted database
   - Multi-factor authentication for elevated security levels
   - Session established with role-appropriate permissions

2. **Password Management**:
   - Strong password requirements enforced
   - Password reset via email verification
   - Periodic password change requirements for administrators
   - Account lockout after failed attempts with progressive delays

#### Social Media Authentication

1. **OAuth Integration**:
   - User selects social media provider (Google, Facebook, Apple)
   - Redirected to provider's authentication system
   - User grants permission for profile information access
   - System creates or links account with social media profile

2. **Account Linking**:
   - Existing users can link social media accounts
   - Multiple social media providers supported per account
   - Account unlinking available with security verification
   - Primary authentication method designation

### 3.3 User Profile Management & Data Orchestration

#### **Comprehensive Member Data Management**

```
Business Logic: Save(Member obj, long userID) - Member Profile Processing

Member Profile Enhancement Framework:
1. SMS Verification Integration: Automatic SMS verification setup based on system configuration
2. Promotional Pricing Management: Default promotional percentage handling and validation
3. Profile Information Parsing: JSON-based member information parsing and validation
4. Communication Limits: Email and SMS limit management with system defaults
5. Payment Report Permissions: Role-based payment reporting access control

Member Information Processing:
IF (memberInfo != NULL) THEN
    member.AllowPaymentReport = memberInfo.AllowPaymentReport
    member.EmailLimit = (memberInfo.EmailLimit > 0) ? memberInfo.EmailLimit : TZSetting.EmailLimit
    member.SMSLimit = (memberInfo.SMSLimit > 0) ? memberInfo.SMSLimit : TZSetting.SMSLimit
END IF

Profile Validation Rules:
- SMS Verification: Automatic verification when SMS_MOD_VERIFY = 0
- Promotional Percentage: Defaults to 0 if not specified
- Communication Limits: Inherits system defaults when not specified
- Profile Completeness: Validates required fields based on user role
```

#### **Multi-Tenant User Management & School Relationships**

```
Business Logic: GetMembers(MemberListParam model, ref int totalRecord, Member currentUser)

Hierarchical Data Access Control:
Teacher-Level Access:
IF (currentUser.IsInRole(RoleGroup.Teacher)) THEN
    dataResult = GetByRole(model, currentUser.RoleID, currentUser.MemberID)
    // Teachers can only access their assigned students
END IF

School-Level Access:
IF (currentUser.IsInRole(RoleGroup.School)) THEN
    dataResult = GetByRoleAndCurrentUser(model, currentUser.MemberID)
    // School owners can access all members within their school
END IF

System-Level Access:
IF (currentUser.IsInRole(RoleGroup.Admin) OR currentUser.IsInRole(RoleGroup.AdminSuper)) THEN
    dataResult = Get(model, totalRecord)
    // Administrators can access all system members
END IF

School-Teacher-Student Relationship Management:
1. GetFirstSchoolOfTeacher(teacherId): Identifies primary school affiliation for teachers
2. GetAllSchoolByParentId(parentId): Manages multi-school parent relationships
3. GetListSchoolByStudentID(studentId): Handles students enrolled in multiple schools
4. School ownership validation and permission inheritance
```

### 3.4 Role Management & Transitions

#### Role Assignment Process

1. **Initial Role Assignment**:
   - New users assigned default role based on registration type
   - School administrators can modify roles within their scope
   - System administrators handle cross-school role assignments
   - Audit trail maintained for all role changes

2. **Role Transition Workflows**:
   - Student-to-Teacher transitions with qualification verification
   - Teacher-to-Administrator promotions with approval workflows
   - Temporary role assignments for substitute teaching
   - Role inheritance for multi-school relationships

## 4. Business Rules & Logic

### 4.1 Access Control Hierarchies & Permission Matrix

#### **Exact Permission Checking Algorithm (CheckPermission Method)**

The system implements a hierarchical permission model with specific business rules:

**Level 1: Super Admin & Admin Override**

- **Admin (400) & Super Admin (500)**: Automatic `return true` - complete system access
- **Business Rule**: Administrative roles bypass all permission checks for operational efficiency

**Level 2: School Administrator Access**

- **School (300)**: Can access any member where `viewMember.SchoolOwnerID == curUser.MemberID`
- **Student Access Exception**: School admins can access students through parent relationships:
  - If student `IsParent = true`: Check if school exists in `GetAllSchoolByParentId(viewMember.MemberID)`
  - If student `IsParent = false`: Check if school exists in `GetListSchoolByStudentID(viewMember.MemberID)`
- **Business Justification**: Schools need access to all students and parents within their educational ecosystem

**Level 3: SubAdmin Delegated Access**

- **SubAdmin (250)**: Can access members where `viewMember.SchoolOwnerID == curUser.SchoolOwnerID`
- **Inheritance Rule**: SubAdmins inherit school-level permissions but cannot access the school owner directly
- **Student Access**: Same parent/student relationship rules as School administrators
- **Business Rule**: SubAdmins operate within their assigned school's scope with delegated authority

**Level 4: Teacher Student Assignment Access**

- **Teacher (200)**: Can only access students returned by `GetAllStudentForViewByTeacher(curUser.MemberID)`
- **Assignment Validation**: System validates teacher-student assignments through active lesson plans
- **Business Rule**: Teachers can only access students they are actively teaching

**Level 5: Student Self & Parent Access**

- **Student (100) with IsParent = true**: Can access children where parent verification exists in `GetParentsVerifiedByUserId(viewMember.MemberID)`
- **Student (100) with IsParent = false**: Can only access own profile (`curUser.MemberID == viewMember.MemberID`)
- **Business Rule**: Students have self-access only, parents have verified child access

#### **School Ownership Validation Rules**

- **Primary Ownership**: `SchoolOwnerID` field determines primary school association
- **Multi-School Relationships**: Students and parents can be associated with multiple schools
- **Cross-School Access**: Permissions validated through relationship tables, not direct ownership
- **Business Logic**: Supports complex family structures with children in different schools

### 4.2 User Registration & Validation Business Rules

#### **SMS Verification Logic**

```
Business Rule: if (!String.IsNullOrEmpty(obj.CellPhone) && smsVerify == 0)
    obj.VerifySMS = 1
```

- **Automatic SMS Verification**: Users with phone numbers get automatic SMS verification when system setting `SMS_MOD_VERIFY = 0`
- **Business Purpose**: Streamlines onboarding while maintaining contact verification
- **Validation Trigger**: Applied during both registration (`RegisterBll.Save()`) and member updates (`MemberBll.Save()`)

#### **Promotional Percentage Default**

```
Business Rule: if (obj.PromoPercentage == null)
    obj.PromoPercentage = 0
```

- **Default Promotion**: All users default to 0% promotional discount
- **Business Logic**: Ensures consistent pricing calculations and prevents null reference errors
- **Application**: Applied during user creation and updates

#### **Communication Limits & Settings**

- **Email Limits**: `mem.EmailLimit = info.EmailLimit > 0 ? info.EmailLimit : TZSetting.EmailLimit`
- **SMS Limits**: `mem.SMSLimit = info.SMSLimit > 0 ? info.SMSLimit : TZSetting.SMSLimit`
- **Payment Report Access**: `mem.AllowPaymentReport = info.AllowPaymentReport`
- **Business Rule**: Individual limits override system defaults, ensuring flexible communication management

### 4.3 Parent-Student Relationship Management

#### **Family Registration Business Logic**

- **Bulk Family Creation**: `SaveListMember()` supports creating multiple family members in single transaction
- **Relationship Establishment**: `SaveRelationStudentAndParent(parentId, studentId)` creates verified parent-child links
- **School Association Validation**: `CheckParentOfSchool(schoolId, parentId)` ensures parents belong to appropriate schools

#### **Parent Access Verification**

- **Verified Parents Only**: `GetParentsVerifiedByUserId(userID)` returns only verified parent relationships
- **Multi-Child Management**: `GetAllChildren(parentID)` returns all children for parent oversight
- **Cross-School Parent Access**: Parents can access children across multiple schools through relationship validation

#### **Age Calculation Business Rule**

```
Business Logic: CountAgeMember(DateTime bday)
DateTime today = DateTime.Today;
int age = today.Year - bday.Year;
if (bday > today.AddYears(-age)) age--;
```

- **Precise Age Calculation**: Accounts for leap years and exact birth dates
- **Business Application**: Used for age-based permissions, pricing, and compliance requirements

### 4.4 Role-Based Data Filtering

#### **Member List Filtering by Current User Role**

```
Business Logic: GetMembers(MemberListParam model, Member currentUser)
if (currentUser.IsInRole(RoleGroup.Teacher))
    // Filter by Current User - only assigned students
    dataResult = GetByRole(model, currentUser.RoleID, currentUser.MemberID)
else if (currentUser.IsInRole(RoleGroup.School))
    // School-wide access
    dataResult = GetByRoleAndCurrentUser(model, currentUser.MemberID)
else
    // Admin access - all members
    dataResult = Get(model)
```

#### **Teacher-Student Assignment Validation**

- **Assignment Check**: `checkStudentOfTeacher(teacherId, memberId)` validates active teaching relationships
- **Parent-Teacher Validation**: `checkParentStudentAndTeacher(teacherId, parentId)` ensures teachers can communicate with parents of their students
- **Business Rule**: Teachers can only access data for students they are actively teaching

### 4.5 Security & Compliance Rules

#### **Login Validation & Session Management**

- **Username/Email Flexibility**: `GetByUserNameOrEmailExits(userName)` supports login with either username or email
- **Duplicate Prevention**: `CheckUserExists(userName)` prevents duplicate usernames
- **Status Validation**: `GetAllStatusNoDeleted(userName)` excludes deleted accounts from authentication

#### **Payment Gateway Access Control**

- **ACH Approval Validation**: `CheckExistsAchApproved(memberId, roleId)` validates ACH payment permissions
- **Gateway-Specific Rules**: Different validation logic for PrecisePay vs other gateways
- **Business Rule**: Payment access tied to role and gateway approval status

#### **Mass Communication Controls**

- **Notification Management**: `UpdateMassTurnOffNotifications(memberId, massTurnOffNotifications)` allows users to control bulk communications
- **Role-Based Messaging**: `SaveToRoleAll(fromMemberId, fromRole, toRole, body)` enables administrators to message entire user groups
- **Business Purpose**: Balances communication needs with user preference management

## 5. User Experience & Scenarios

### 5.1 Student Enrollment Scenario

**Scenario**: A 12-year-old student wants to enroll in piano lessons at a local music school.

**Workflow**:

1. Parent creates account on behalf of minor student
2. Completes student profile with musical interests and experience level
3. Selects local music school and submits enrollment application
4. School administrator reviews application and approves enrollment
5. Student gains access to school's piano teachers and beginner courses
6. Parent receives notifications about lesson scheduling and progress updates
7. Student begins engaging with educational content and scheduling lessons

**Success Criteria**:

- Account created within 5 minutes
- School approval within 24 hours
- Student can access appropriate content immediately after approval
- Parent maintains oversight and notification preferences

### 5.2 Multi-School Teacher Scenario

**Scenario**: An experienced piano teacher wants to teach at multiple music schools to expand their student base.

**Workflow**:

1. Teacher creates professional account with credentials and experience
2. Applies to multiple music schools through the platform
3. Each school reviews qualifications and makes partnership decisions
4. Teacher gains access to approved schools' student pools and resources
5. Sets availability and preferences for each school separately
6. Manages students from multiple schools through unified interface
7. Receives consolidated compensation tracking across all schools

**Success Criteria**:

- Teacher can manage multiple school relationships efficiently
- Students from different schools remain properly segregated
- Compensation tracking accurately reflects multi-school teaching
- Administrative overhead minimized through unified interface

### 5.3 School Administrator Growth Scenario

**Scenario**: A music school administrator wants to expand operations by adding new teachers and increasing student enrollment.

**Workflow**:

1. Administrator reviews teacher applications and conducts interviews
2. Approves qualified teachers and sets up compensation structures
3. Creates marketing campaigns to attract new students
4. Monitors enrollment trends and teacher utilization rates
5. Adjusts pricing and course offerings based on demand analytics
6. Tracks business performance through comprehensive reporting dashboard
7. Scales operations while maintaining quality and profitability

**Success Criteria**:

- Teacher onboarding completed within one week
- Student enrollment tracking provides actionable insights
- Business analytics support strategic decision-making
- Operational efficiency maintained during growth phases

---

**Document Status**: ✅ COMPREHENSIVE - Complete business requirements defined
**Last Updated**: 2025-07-21
**Version**: 1.0
