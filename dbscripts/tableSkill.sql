USE [Eugenics]
GO

/****** Object:  Table [dbo].[Skill]    Script Date: 12/29/2015 7:15:48 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Skill](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](500) NOT NULL,
	[ActivationStat] [varchar](50) NULL,
	[ActivationMultiplier] [float] NULL,
	[DLC] [bit] NOT NULL CONSTRAINT [DF_Skill_DLC]  DEFAULT ((0)),
	[MaleInheritable] [bit] NOT NULL CONSTRAINT [DF_Skill_MaleInheritable]  DEFAULT ((1)),
	[FemaleInheritable] [bit] NOT NULL CONSTRAINT [DF_Skill_FemaleInheritable]  DEFAULT ((1)),
 CONSTRAINT [PK_Skill] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


