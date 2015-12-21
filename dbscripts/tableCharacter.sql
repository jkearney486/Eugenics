USE [Eugenics]
GO

/****** Object:  Table [dbo].[Character]    Script Date: 5/6/2014 3:35:51 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Character](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NULL,
	[Gender] [varchar](50) NULL,
	[ModStr] [int] NOT NULL,
	[ModMag] [int] NOT NULL,
	[ModSkl] [int] NOT NULL,
	[ModSpd] [int] NOT NULL,
	[ModLck] [int] NOT NULL,
	[ModDef] [int] NOT NULL,
	[ModRes] [int] NOT NULL,
	[ParentID] [bigint] NULL,
 CONSTRAINT [PK_Character] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Character] ADD  DEFAULT (NULL) FOR [ParentID]
GO

ALTER TABLE [dbo].[Character]  WITH CHECK ADD  CONSTRAINT [FK_Parent_Child] FOREIGN KEY([ParentID])
REFERENCES [dbo].[Character] ([Id])
GO

ALTER TABLE [dbo].[Character] CHECK CONSTRAINT [FK_Parent_Child]
GO


