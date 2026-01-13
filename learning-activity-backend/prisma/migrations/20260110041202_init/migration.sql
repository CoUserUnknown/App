BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[analystsRecords] (
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [FullName] VARCHAR(250) NOT NULL,
    [Email] VARCHAR(250) NOT NULL,
    [IsActive] BIT NOT NULL CONSTRAINT [DF__analystsR__IsAct__5629CD9C] DEFAULT 1,
    [FromTeam] VARCHAR(50) NOT NULL,
    [AnalystWave] TINYINT,
    CONSTRAINT [PK__analysts__3214EC07E350DCBC] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [UQ__analysts__A9D10534F98068E8] UNIQUE NONCLUSTERED ([Email])
);

-- CreateTable
CREATE TABLE [dbo].[coursesList] (
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [coursename] VARCHAR(500) NOT NULL,
    [duration] DECIMAL(5,2) NOT NULL,
    [DeliveryType] VARCHAR(20) NOT NULL,
    [ProductName] VARCHAR(50) NOT NULL,
    [Tecnology] VARCHAR(50) NOT NULL,
    CONSTRAINT [PK__coursesL__3214EC07ADA7226C] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [UQ__coursesL__E08EA5569A6C53D7] UNIQUE NONCLUSTERED ([coursename])
);

-- CreateTable
CREATE TABLE [dbo].[learningActivities] (
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [AnalystId] UNIQUEIDENTIFIER NOT NULL,
    [CourseId] UNIQUEIDENTIFIER NOT NULL,
    [TrainerId] UNIQUEIDENTIFIER,
    [DeliveryType] VARCHAR(20) NOT NULL,
    [ActivityDate] DATE NOT NULL,
    [DurationHours] DECIMAL(5,2) NOT NULL,
    [CreatedAt] DATETIME2 NOT NULL CONSTRAINT [DF__learningA__Creat__5EBF139D] DEFAULT sysdatetime(),
    [IsDeleted] BIT NOT NULL CONSTRAINT [DF__learningA__IsDel__5FB337D6] DEFAULT 0,
    CONSTRAINT [PK__learning__3214EC0721C45361] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[sysdiagrams] (
    [name] NVARCHAR(128) NOT NULL,
    [principal_id] INT NOT NULL,
    [diagram_id] INT NOT NULL IDENTITY(1,1),
    [version] INT,
    [definition] VARBINARY(max),
    CONSTRAINT [PK__sysdiagr__C2B05B61B2206633] PRIMARY KEY CLUSTERED ([diagram_id]),
    CONSTRAINT [UK_principal_name] UNIQUE NONCLUSTERED ([principal_id],[name])
);

-- CreateTable
CREATE TABLE [dbo].[trainersList] (
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [FullName] NVARCHAR(200) NOT NULL,
    [IsActive] BIT NOT NULL CONSTRAINT [DF__trainersL__IsAct__5BE2A6F2] DEFAULT 1,
    CONSTRAINT [PK__trainers__3214EC0769726CF1] PRIMARY KEY CLUSTERED ([Id])
);

-- AddForeignKey
ALTER TABLE [dbo].[learningActivities] ADD CONSTRAINT [FK_LA_Analyst] FOREIGN KEY ([AnalystId]) REFERENCES [dbo].[analystsRecords]([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[learningActivities] ADD CONSTRAINT [FK_LA_Course] FOREIGN KEY ([CourseId]) REFERENCES [dbo].[coursesList]([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[learningActivities] ADD CONSTRAINT [FK_LA_Trainer] FOREIGN KEY ([TrainerId]) REFERENCES [dbo].[trainersList]([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
