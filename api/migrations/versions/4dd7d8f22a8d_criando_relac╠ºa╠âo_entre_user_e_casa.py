"""Criando relação entre user e casa

Revision ID: 4dd7d8f22a8d
Revises: a90d8fd15f24
Create Date: 2023-10-16 20:07:20.267099

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4dd7d8f22a8d'
down_revision = 'a90d8fd15f24'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('casa', schema=None) as batch_op:
        batch_op.add_column(sa.Column('createdByUserId', sa.Integer(), nullable=False))
        batch_op.create_foreign_key(None, 'user', ['createdByUserId'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('casa', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('createdByUserId')

    # ### end Alembic commands ###
